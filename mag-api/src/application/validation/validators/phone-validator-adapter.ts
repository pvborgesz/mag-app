import { InvalidParamError } from '@/shared/helpers/errors'

import { IValidator } from '../contracts/validator'

export class PhoneAdapter implements IValidator {
  constructor(private readonly value: string) {}

  validate(): Error | undefined {
    if (!this.value) return undefined
    if (/^(\d{2})(\d{8,9})$/gm.test(this.value)) {
      return undefined
    }
    return new InvalidParamError(`'${this.value}' não é um telefone válido`)
  }
}
