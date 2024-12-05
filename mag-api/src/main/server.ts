import { logError, logInfo, logStartServer, logWarn, writeLogToFile } from '@/main/config/server-utils/logger'
import cluster, { Worker } from 'cluster'
import dotenv from 'dotenv'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import os from 'os'

dotenv.config()

const portEnv = Number(process.env.APP_PORT)
const requestTimeout = 1000 * 60 // 1 minute

async function startApp() {
  const appModule = await import('./config/app')
  return appModule.default
}

async function startServer() {
  const app = await startApp()
  return createServer(app).listen(portEnv, '0.0.0.0', () => {
    logStartServer(`Server running on http://0.0.0.0:${portEnv}`)
  })
}

async function startServerByWorkers() {
  const server = await startServer()
  server.on('request', (req: IncomingMessage, res: ServerResponse) => {
    let headersSent = false // Flag to control whether response headers have been sent
    const responseTimer = setTimeout(() => {
      // Check if headers have been sent before sending a response
      if (!headersSent && !res.headersSent) {
        logError(`A requisição demorou mais do que o esperado: ${req.url}`)
        const logData = {
          statusCode: res.statusCode || 500,
          errorInfo: {
            message: res.statusMessage || 'Internal Server Error'
          }
        }
        writeLogToFile('A requisição demorou mais do que o esperado', req, res, logData)
        res.writeHead(logData.statusCode, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            message: 'A requisição demorou mais do que o esperado, por favor, tente novamente mais tarde.'
          })
        )
        if (cluster.worker) cluster.worker.kill()
        headersSent = true
      }
    }, requestTimeout)
    // 'finish' event is emitted when the entire response has been sent
    res.on('finish', () => {
      // Indicate that headers have been sent
      headersSent = true
      clearTimeout(responseTimer)
    })
  })
  return server
}

// // Check if environment is production to start the local server
if (process.env.APP_ENVIRONMENT === 'local') {
  startServer().catch(error => {
    logError(`Failed to start worker: ${error.message}`)
  })
} else if (cluster.isPrimary) {
  // Start the primary server and create workers for available cores
  const numCPUs = os.cpus().length
  logInfo(`Primary ${process.pid} is running`)
  const workers: { [key: number]: Worker } = {}
  for (let index = 0; index < numCPUs; index += 1) {
    // Define environment variables for each worker
    const workerEnv = { APP_PORT: (portEnv + index).toString() }
    // Create workers
    createWorker(workerEnv, index, workers)
  }
} else {
  // Start the server for workers
  startServerByWorkers().catch(error => {
    logError(`Failed to start worker: ${error.message}`)
  })
}

function createWorker(workerEnv: any, index: number, workers: { [key: number]: Worker }) {
  // Create a new worker with the given environment variables
  const newWorker = cluster.fork(workerEnv)
  // Create a copy of the workers object
  const updatedWorkers = { ...workers }
  // Assign the new worker to the copied object
  updatedWorkers[index] = newWorker
  // Listen for the 'online' event to log worker status
  newWorker.on('online', () => {
    logInfo(`Worker ${index} is online with port ${workerEnv.APP_PORT}`)
  })
  // Listen for the 'exit' event to handle worker failure
  newWorker.on('exit', (code, signal) => {
    logWarn(`Worker ${index} died (${signal || code}). Restarting...`)
    // Restart the worker in case of failure
    createWorker(workerEnv, index, updatedWorkers)
  })
}
