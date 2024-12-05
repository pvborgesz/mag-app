import { IValidator } from './contracts/validator'

export class ValidationComposite {
  constructor(private readonly validators: IValidator[]) {}

  validate() {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) return error
    }
    return undefined
  }
}
