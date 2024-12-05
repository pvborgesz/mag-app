import { MessageCodeEnum } from '@/types'
import { AppError } from './app-error'

export class WarningError extends AppError {
  constructor(message: string) {
    super(`${MessageCodeEnum.WARNING} ${message}`)
    this.name = 'WarningError'
  }
}
