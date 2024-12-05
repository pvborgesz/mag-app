import { AppError } from './app-error'

export class UnauthorizedError extends AppError {
  constructor() {
    super('Não autorizado')
    this.name = 'UnauthorizedError'
  }
}
