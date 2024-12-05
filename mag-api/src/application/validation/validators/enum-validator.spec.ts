import { EnumValidatorAdapter } from './enum-validator'

describe('EnumValidatorAdapter', () => {
  it('should return undefined if the value is undefined', () => {
    const validator = new EnumValidatorAdapter(undefined as any)
    const result = validator.validate()
    expect(result).toBeUndefined()
  })
  it('should return undefined if the value is null', () => {
    const validator = new EnumValidatorAdapter(null as any)
    const result = validator.validate()
    expect(result).toBeUndefined()
  })
  it('should return undefined if the value is an empty string', () => {
    const validator = new EnumValidatorAdapter('')
    const result = validator.validate()
    expect(result).toBeUndefined()
  })
})
