import { InvalidParamError } from '@/shared/helpers/errors'

import { MaxLengthValidator } from './max-length-validator'

describe('MaxLengthValidator', () => {
  it('should return undefined if Validator returns undefined', () => {
    const value = '12345678'
    const max = 8
    const sut = new MaxLengthValidator(value, max)
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should return undefined if value is undefined', () => {
    const sut = new MaxLengthValidator(undefined as any, 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new MaxLengthValidator(null as any, 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new MaxLengthValidator('', 1)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return an Error if Validator returns an error', () => {
    const value = '123456789'
    const max = 8
    const sut = new MaxLengthValidator(value, max)
    const error = sut.validate()
    expect(error).toEqual(
      new InvalidParamError(`'${value}' ultrapassou o valor máximo. Tem ${value.length}, Max.: ${max}`),
    )
  })
})
