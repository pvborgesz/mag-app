import { AppError } from './app-error'

export class MissingParamError extends AppError {
  constructor(paramName: string) {
    super(`Parâmetro ausente: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
