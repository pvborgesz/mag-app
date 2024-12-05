import { ValidationComposite } from './composite'
import { IValidator } from './contracts/validator'

class ValidatorStub implements IValidator {
  validate(): Error | undefined {
    return undefined
  }
}

describe('ValidationComposite', () => {
  it('should return undefined if all Validators return undefined', () => {
    const validator1 = new ValidatorStub()
    const validator2 = new ValidatorStub()
    const sut = new ValidationComposite([validator1, validator2])
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should return the first error', () => {
    const validator1 = new ValidatorStub()
    jest.spyOn(validator1, 'validate').mockReturnValueOnce(new Error('validator1'))
    const validator2 = new ValidatorStub()
    jest.spyOn(validator2, 'validate').mockReturnValueOnce(new Error('validator2'))

    const sut = new ValidationComposite([validator1, validator2])
    const error = sut.validate()
    expect(error).toEqual(new Error('validator1'))
  })

  it('should return the error', () => {
    const validator1 = new ValidatorStub()
    const validator2 = new ValidatorStub()
    jest.spyOn(validator2, 'validate').mockReturnValueOnce(new Error('validator2'))

    const sut = new ValidationComposite([validator1, validator2])
    const error = sut.validate()
    expect(error).toEqual(new Error('validator2'))
  })
})
