import dotenv from 'dotenv'
import express from 'express'

import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import storage from './storage'

dotenv.config()
const app = express()

// if (process.env.APP_ENVIRONMENT === 'production') {
// TODO: Log system
// }

app.use('/files', express.static(storage.disk.uploadsFolder))
setupMiddlewares(app)
setupRoutes(app)

export default app
