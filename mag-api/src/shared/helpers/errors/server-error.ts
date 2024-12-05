export class ServerError extends Error {
  constructor(error?: Error) {
    super(`Servidor ${String(error)}`)
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
