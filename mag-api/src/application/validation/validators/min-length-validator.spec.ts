import { InvalidParamError } from '@/shared/helpers/errors'

import { MinLengthValidator } from './min-length-validator'

describe('MinLengthValidator', () => {
  it('should return undefined if Validator returns undefined', () => {
    const value = '12345678'
    const min = 8
    const sut = new MinLengthValidator(value, min)
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should return undefined if value is undefined', () => {
    const sut = new MinLengthValidator(undefined as any, 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new MinLengthValidator(null as any, 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new MinLengthValidator('', 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return an Error if Validator returns an error', () => {
    const value = '1234567'
    const min = 8
    const sut = new MinLengthValidator(value, min)
    const error = sut.validate()
    expect(error).toEqual(new InvalidParamError(`'${value}' não atingiu o valor mínimo`))
  })
})
