/* eslint-disable no-console */
function CLogger(message: string) {
  console.log(`${message}`)
}
const log = (message: string) => {
  CLogger(`\n\x1b[44m \x1b[1m[LOG] \x1b[0m\x1b[0m > ${message}\n`) // Blue
}

const logStartServer = (message: string) => {
  CLogger(`\n\x1b[42m \x1b[1m[SERVER STARTED] \x1b[0m\x1b[0m > \x1b[30m${message}\x1b[0m\n`) // Green
}

const logError = (message: string) => {
  CLogger(`\n\x1b[41m \x1b[1m[ERROR] \x1b[0m\x1b[0m > ${message}\n`) // Red
}

const logInfo = (message: string) => {
  CLogger(`\n\x1b[46m \x1b[1m[INFO] \x1b[0m\x1b[0m > ${message}\n`) // Cyan
}

const logWarn = (message: string) => {
  CLogger(`\n\x1b[43m \x1b[1m[WARN] \x1b[0m\x1b[0m > ${message}\n`) // Yellow
}

export { log, logStartServer, logError, logInfo, logWarn }
