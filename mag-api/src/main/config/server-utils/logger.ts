import { logError, logInfo, logStartServer, logWarn } from '@/domain/shared/utils/logger'
import fs from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import path from 'path'

export function writeLogToFile(
  message: any,
  req: IncomingMessage | null = null,
  res: ServerResponse | null = null,
  logInfo: any = {}
) {
  const logMessage = message.toString()
  const timestamp = new Date().toISOString()
  const logsPath = path.join(__dirname, '..', '..', '..', '..', 'logs')
  const filename = `${logsPath}/${new Date().toISOString().split('T')[0]}.log`

  if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath, { recursive: true })
  }

  const logData = [
    `----------------------[${timestamp}]-----------------------`,
    req
      ? `- Request Info: ${JSON.stringify(
          { method: req.method, url: req.url, headers: req.headers },
          null,
          2
        )}`
      : '',
    res
      ? `- Response Info: ${JSON.stringify(
          {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
            errorInfo: res.statusCode >= 500 ? { message: 'Internal Server Error' } : null
          },
          null,
          2
        )}`
      : '',
    logInfo.errorInfo ? `- Error Info: ${JSON.stringify(logInfo.errorInfo, null, 2)}` : '',
    `- Log Message: ${logMessage}`,
    `-----------------------------------------------------------------------\n\n\n\n`
  ]
    .filter(Boolean)
    .join('\n')

  fs.appendFileSync(filename, logData)
}

export { logError, logInfo, logStartServer, logWarn }
