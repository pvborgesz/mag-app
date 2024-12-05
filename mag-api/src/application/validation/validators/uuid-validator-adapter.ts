import { InvalidParamError } from '@/shared/helpers/errors'
import validator from 'validator'

import { IValidator } from '../contracts/validator'

export class UuidValidatorAdapter implements IValidator {
  constructor(private readonly value: string) {}

  validate(): Error | undefined {
    if (!this.value) return undefined
    if (validator.isUUID(this.value)) {
      return undefined
    }
    return new InvalidParamError(`'${this.value}' não é um uuid válido`)
  }
}
