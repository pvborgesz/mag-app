import { InvalidParamError } from '@/shared/helpers/errors'

import { PhoneAdapter } from './phone-validator-adapter'

const value = '11988123456'
function makeSut() {
  const sut = new PhoneAdapter(value)
  return { sut }
}

describe('PhoneAdapter', () => {
  it('should call validator with correct value', () => {
    const { sut } = makeSut()
    expect(sut).toEqual({ value })
  })

  it('should return true if regex returns true', () => {
    const response = /^((\d{2})(\d{1})(\d{8}))/gm.test(value)
    expect(response).toBe(true)
  })

  it('should return undefined if validator returns true', () => {
    const { sut } = makeSut()
    const validatePhone = sut.validate()
    expect(validatePhone).toBeUndefined()
  })

  it('should return an Error if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    const validatePhone = sut.validate()
    expect(validatePhone).toEqual(new InvalidParamError('any_field'))
  })

  it('should return undefined if value is undefined', () => {
    const sut = new PhoneAdapter(undefined as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is null', () => {
    const sut = new PhoneAdapter(null as any)
    const response = sut.validate()
    expect(response).toBeUndefined()
  })
  it('should return undefined if value is empty', () => {
    const sut = new PhoneAdapter('')
    const response = sut.validate()
    expect(response).toBeUndefined()
  })

  it('should return an Error if Validator returns an error', () => {
    const value = '118800000'
    const sut = new PhoneAdapter(value)
    const error = sut.validate()
    expect(error).toEqual(new InvalidParamError(`'${value}' não é um telefone válido`))
  })
})
