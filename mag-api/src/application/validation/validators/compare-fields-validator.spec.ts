import { InvalidParamError } from '@/shared/helpers/errors'
import { CompareFieldsValidator } from './compare-fields-validator'

describe('CompareFieldsValidator', () => {
  it('should return undefined if Validator returns undefined', () => {
    const value = 'any_value'
    const valueToCompare = 'any_value'
    const sut = new CompareFieldsValidator(value, valueToCompare)
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should return undefined if value is undefined', () => {
    const sut = new CompareFieldsValidator(undefined as any, undefined as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new CompareFieldsValidator(null as any, null as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new CompareFieldsValidator('', '')
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return an Error if Validator returns false', () => {
    const value = 'any_value'
    const valueToCompare = 'different_value'
    const sut = new CompareFieldsValidator(value, valueToCompare)
    const error = sut.validate()
    expect(error).toEqual(new InvalidParamError(`'${value}' não é igual a '${valueToCompare}'`))
  })
})
