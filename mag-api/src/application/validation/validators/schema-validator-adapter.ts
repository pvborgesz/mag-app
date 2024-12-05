import { IValidator } from '../contracts/validator'

let currentKey = ''
export type Schema = Array<any>
export class SchemaValidatorAdapter implements IValidator {
  constructor(private readonly schema: Schema, private readonly data: any) {}

  validate(): Error | undefined {
    if (Object.keys(this.data).length === 0) {
      return undefined
    }
    if (Object.keys(this.schema).length === 0) {
      return undefined
    }
    if (
      Object.keys(this.data).every(key => {
        currentKey = key
        return this.schema.includes(key)
      })
    ) {
      return undefined
    }
    return new Error(`The parameter '${currentKey}' is not allowed`)
  }
}
