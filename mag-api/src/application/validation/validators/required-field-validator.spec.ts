/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParamError } from '@/shared/helpers/errors'

import { RequiredFieldValidator } from './required-field-validator'

describe('RequiredFieldValidator', () => {
  it('should return MissingParamError if value is empty', () => {
    const sut = new RequiredFieldValidator('any_field', '')
    const error = sut.validate()
    expect(error).toEqual(new MissingParamError('any_field é obrigatório'))
  })

  it('should return MissingParamError if value is null', () => {
    const sut = new RequiredFieldValidator('any_field', null as any)
    const error = sut.validate()
    expect(error).toEqual(new MissingParamError('any_field é obrigatório'))
  })

  it('should return MissingParamError if value is undefined', () => {
    const sut = new RequiredFieldValidator('any_field', undefined as any)
    const error = sut.validate()
    expect(error).toEqual(new MissingParamError('any_field é obrigatório'))
  })

  it('should return undefined if value is valid', () => {
    const sut = new RequiredFieldValidator('any_field', 'any_valid')
    const error = sut.validate()
    expect(error).toBeUndefined()
  })
})
