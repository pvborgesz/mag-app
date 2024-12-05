import validator from 'validator'

import { InvalidParamError } from '@/shared/helpers/errors'
import { IValidator } from '../contracts/validator'

export class EmailValidatorAdapter implements IValidator {
  constructor(private readonly value: string) {}

  validate(): Error | undefined {
    if (!this.value) return undefined
    const isValid = validator.isEmail(this.value)
    if (!isValid) return new InvalidParamError(`'${this.value}' não é um email válido`)
    return undefined
  }
}
