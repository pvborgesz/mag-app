import { AppError } from './app-error'

export class AlreadyExistsError extends AppError {
  constructor(paramName: string) {
    super(`${paramName} já existe!`)
    this.name = 'AlreadyExistsError'
  }
}
