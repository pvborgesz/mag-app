import { AppError } from './app-error'

export class ForbiddenError extends AppError {
  constructor(message?: string) {
    super('Acesso negado')
    this.name = 'ForbiddenError'
    this.message = message || ''
  }
}
