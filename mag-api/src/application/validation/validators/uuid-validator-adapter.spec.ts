import { InvalidParamError } from '@/shared/helpers/errors'
import validator from 'validator'

import { UuidValidatorAdapter } from './uuid-validator-adapter'

function makeSut() {
  const sut = new UuidValidatorAdapter('any_value')
  return { sut }
}

jest.mock('validator', () => ({
  isUUID: jest.fn().mockReturnValue(true),
}))

describe('UuidValidatorAdapter', () => {
  it('should call validator with correct value', () => {
    const { sut } = makeSut()
    const isUUIDSpy = jest.spyOn(validator, 'isUUID')
    sut.validate()
    expect(isUUIDSpy).toHaveBeenCalledWith('any_value')
  })

  it('should return undefined if validator returns true', () => {
    const { sut } = makeSut()
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is undefined', () => {
    const sut = new UuidValidatorAdapter(undefined as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new UuidValidatorAdapter(null as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new UuidValidatorAdapter('')
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return an Error if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isUUID').mockReturnValueOnce(false)
    const response = sut.validate()
    expect(response).toEqual(new InvalidParamError(`'any_value' não é um uuid válido`))
  })
})
