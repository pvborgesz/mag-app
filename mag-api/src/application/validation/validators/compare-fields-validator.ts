import { InvalidParamError } from '@/shared/helpers/errors'
import { IValidator } from '../contracts/validator'

export class CompareFieldsValidator implements IValidator {
  constructor(private readonly value: string, private readonly valueToCompare: string) {}

  validate(): Error | undefined {
    if (!this.value && !this.valueToCompare) return undefined
    if (this.value === this.valueToCompare) return undefined
    return new InvalidParamError(`'${this.value}' não é igual a '${this.valueToCompare}'`)
  }
}
