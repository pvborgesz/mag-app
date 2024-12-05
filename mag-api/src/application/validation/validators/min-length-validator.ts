import { InvalidParamError } from '@/shared/helpers/errors'

import { IValidator } from '../contracts/validator'

export class MinLengthValidator implements IValidator {
  constructor(private readonly value: string, private readonly min: number) {}

  validate(): Error | undefined {
    if (!this.value) return undefined
    if (this.value.length >= this.min) return undefined
    return new InvalidParamError(`'${this.value}' não atingiu o valor mínimo`)
  }
}
