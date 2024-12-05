import { ValidationBuilder } from './builder'
import {
  EmailValidatorAdapter,
  MaxLengthValidator,
  MinLengthValidator,
  RequiredFieldValidator,
  UuidValidatorAdapter,
} from './validators'
import { BooleanValidatorAdapter } from './validators/boolean-field-validator'
import { EnumValidatorAdapter } from './validators/enum-validator'
import { EqualLengthValidator } from './validators/equal-length-validator'
import { PhoneAdapter } from './validators/phone-validator-adapter'

export enum TestTypeEnum {
  TEST = 'TEST',
  NOT_TEST = 'NOT_TEST',
}

describe('ValidationBuilder', () => {
  it('should return a RequiredFieldValidator', () => {
    const validators = ValidationBuilder.of('any_value').required('any_name').build()
    expect(validators).toEqual([new RequiredFieldValidator('any_name', 'any_value')])
  })

  it('should return an EmailValidator', () => {
    const validators = ValidationBuilder.of('any_value').email().build()
    expect(validators).toEqual([new EmailValidatorAdapter('any_value')])
  })

  it('should return a MaxLengthValidator', () => {
    const validators = ValidationBuilder.of('12345678').max(8).build()
    expect(validators).toEqual([new MaxLengthValidator('12345678', 8)])
  })

  it('should return a MinLengthValidator', () => {
    const validators = ValidationBuilder.of('123456789').min(8).build()
    expect(validators).toEqual([new MinLengthValidator('123456789', 8)])
  })

  it('should return a EqualLengthValidator', () => {
    const validators = ValidationBuilder.of('123456789').equalLength(8).build()
    expect(validators).toEqual([new EqualLengthValidator('123456789', 8)])
  })

  it('should return an UuidValidator', () => {
    const validators = ValidationBuilder.of('any_value').uuid().build()
    expect(validators).toEqual([new UuidValidatorAdapter('any_value')])
  })

  it('should return an phone', () => {
    const validators = ValidationBuilder.of('any_value').phone().build()
    expect(validators).toEqual([new PhoneAdapter('any_value')])
  })

  it('should return an EnumValidator', () => {
    const validators = ValidationBuilder.of('any_value').enumEqual(TestTypeEnum).build()
    expect(validators).toEqual([new EnumValidatorAdapter(TestTypeEnum)])
  })

  it('should return an boolean', () => {
    const validators = ValidationBuilder.of('true').boolean().build()
    expect(validators).toEqual([new BooleanValidatorAdapter('true')])
  })
})
