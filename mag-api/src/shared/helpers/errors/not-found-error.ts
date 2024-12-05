import { AppError } from './app-error'

export class NotFoundError extends AppError {
  constructor(paramName: string) {
    super(`${paramName} não encontrado!`)
    this.name = 'NotFoundError'
  }
}
