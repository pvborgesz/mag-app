import { BooleanValidatorAdapter } from './boolean-field-validator'

describe('BooleanValidatorAdapter', () => {
  it('should return undefined for null or undefined values', () => {
    const validator = new BooleanValidatorAdapter(null)
    expect(validator.validate()).toBeUndefined()

    const validator2 = new BooleanValidatorAdapter(undefined)
    expect(validator2.validate()).toBeUndefined()
  })

  it('should convert string "true" to boolean true', () => {
    const validator = new BooleanValidatorAdapter('true')
    expect(validator.validate()).toBeUndefined()
    expect(validator.value).toBe(true)
  })

  it('should convert string "false" to boolean false', () => {
    const validator = new BooleanValidatorAdapter('false')
    expect(validator.validate()).toBeUndefined()
    expect(validator.value).toBe(false)
  })

  it('should return error for invalid string representation', () => {
    const validator = new BooleanValidatorAdapter('invalid')
    const result = validator.validate()
    expect(result).toBeInstanceOf(Error)
    expect(result?.message).toContain('must be a boolean or a valid string representation of boolean')
  })

  it('should return undefined if value is undefined', () => {
    const sut = new BooleanValidatorAdapter(undefined as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new BooleanValidatorAdapter(null as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new BooleanValidatorAdapter('')
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return error for non-boolean value', () => {
    const validator = new BooleanValidatorAdapter(123)
    const result = validator.validate()
    expect(result).toBeInstanceOf(Error)
    expect(result?.message).toContain('must be a boolean or a valid string representation of boolean')
  })
})
