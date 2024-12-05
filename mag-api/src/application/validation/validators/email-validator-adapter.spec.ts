import validator from 'validator'

import { InvalidParamError } from '@/shared/helpers/errors'
import { EmailValidatorAdapter } from './email-validator-adapter'

function makeSut() {
  const sut = new EmailValidatorAdapter('valid@email.com')
  return sut
}

describe('EmailValidatorAdapter', () => {
  it('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.validate()
    expect(isEmailSpy).toHaveBeenCalledWith('valid@email.com')
  })

  it('should return error if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const error = sut.validate()
    expect(error).toEqual(new InvalidParamError(`'valid@email.com' não é um email válido`))
  })

  it('should return undefined if value is undefined', () => {
    const sut = new EmailValidatorAdapter(undefined as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new EmailValidatorAdapter(null as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new EmailValidatorAdapter('')
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return undefined if validator returns true', () => {
    const sut = makeSut()
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
