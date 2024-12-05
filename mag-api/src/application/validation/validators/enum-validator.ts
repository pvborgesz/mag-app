import { IValidator } from "../contracts/validator"
import { ValueType } from "./required-field-validator"

export class EnumValidatorAdapter implements IValidator {
  constructor(private readonly value: ValueType) {}

  validate(): Error | undefined {
    if (!this.value) {
      return undefined
    }
    if (!Object.values(this.value).includes(this.value)) {
      return new Error(`Value is not valid for the enum. Types: [${Object.values(this.value)}]`)
    }
    return undefined
  }
}
