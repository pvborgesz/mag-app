import { InvalidParamError } from '@/shared/helpers/errors'
import { IValidator } from '../contracts/validator'

export class EqualLengthValidator implements IValidator {
  constructor(private readonly value: string, private readonly equal: number) {}

  validate(): Error | undefined {
    if (!this.value) return undefined
    if (this.value.length === this.equal) return undefined
    return new InvalidParamError(`'${this.value}' é incompatível com o número de caracteres permitidos`)
  }
}
