import { MissingParamError } from '@/shared/helpers/errors'

import { IValidator } from '../contracts/validator'

export type ValueType = any | undefined

export class RequiredFieldValidator implements IValidator {
  constructor(private readonly name: string, private readonly value: ValueType) {}

  validate(): Error | undefined {
    if (
      [this.value].length === 0 ||
      String(this.value).trim() === '' ||
      this.value === null ||
      this.value === undefined
    ) {
      return new MissingParamError(`${this.name} é obrigatório`)
    }
    return undefined
  }
}
