import { IValidator } from '../contracts/validator'

export class BooleanValidatorAdapter implements IValidator {
  constructor(public value: any) {}

  validate(): Error | undefined {
    if (String(this.value).trim() === '' || this.value === null || this.value === undefined) {
      return undefined
    }

    if (typeof this.value === 'string') {
      if (this.value.toLowerCase() === 'true') {
        this.value = true
      } else if (this.value.toLowerCase() === 'false') {
        this.value = false
      } else {
        return new Error(`${this.value} must be a boolean or a valid string representation of boolean`)
      }
    }

    if (typeof this.value !== 'boolean') {
      return new Error(`${this.value} must be a boolean or a valid string representation of boolean`)
    }
    return undefined
  }
}
