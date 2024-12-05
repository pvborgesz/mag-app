import { InvalidParamError } from '@/shared/helpers/errors'
import { EqualLengthValidator } from './equal-length-validator'

describe('EqualLengthValidator', () => {
  it('should return undefined if Validator returns undefined', () => {
    const value = '12345678'
    const Equal = 8
    const sut = new EqualLengthValidator(value, Equal)
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should return undefined if value is undefined', () => {
    const sut = new EqualLengthValidator(undefined as any, 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new EqualLengthValidator(null as any, 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new EqualLengthValidator('', 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return an Error if Validator returns an error', () => {
    const value = '1234567'
    const Equal = 8
    const sut = new EqualLengthValidator(value, Equal)
    const error = sut.validate()
    expect(error).toEqual(
      new InvalidParamError(`'${value}' é incompatível com o número de caracteres permitidos`),
    )
  })
})
