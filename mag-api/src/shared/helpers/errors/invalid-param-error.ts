import { AppError } from './app-error'

export class InvalidParamError extends AppError {
  constructor(paramName: string) {
    super(`Valor de parâmetro inválido: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
