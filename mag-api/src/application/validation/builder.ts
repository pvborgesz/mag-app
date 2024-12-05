import { IValidator } from "./contracts/validator"
import { BooleanValidatorAdapter, EmailValidatorAdapter, MaxLengthValidator, MinLengthValidator, PhoneAdapter, RequiredFieldValidator, SchemaValidatorAdapter, UuidValidatorAdapter, ValueType } from "./validators"
import { CompareFieldsValidator } from "./validators/compare-fields-validator"
import { EnumValidatorAdapter } from "./validators/enum-validator"
import { EqualLengthValidator } from "./validators/equal-length-validator"


export class ValidationBuilder {
  private constructor(private readonly value: ValueType, private readonly validators: IValidator[] = []) {}

  static of(value: ValueType): ValidationBuilder {
    return new ValidationBuilder(value)
  }

  required(field: string): ValidationBuilder {
    this.validators.push(new RequiredFieldValidator(field, this.value))
    return this
  }

  email(): ValidationBuilder {
    if (this.value) this.validators.push(new EmailValidatorAdapter(this.value))
    return this
  }

  equal(valueToCompare: string): ValidationBuilder {
    if (this.value) this.validators.push(new CompareFieldsValidator(this.value, valueToCompare))
    return this
  }

  max(max: number): ValidationBuilder {
    if (this.value) this.validators.push(new MaxLengthValidator(this.value, max))
    return this
  }

  min(min: number): ValidationBuilder {
    if (this.value) this.validators.push(new MinLengthValidator(this.value, min))
    return this
  }

  equalLength(equal: number): ValidationBuilder {
    if (this.value) this.validators.push(new EqualLengthValidator(this.value, equal))
    return this
  }

  uuid(): ValidationBuilder {
    if (this.value) this.validators.push(new UuidValidatorAdapter(this.value))
    return this
  }


  phone(): ValidationBuilder {
    if (this.value) this.validators.push(new PhoneAdapter(this.value))
    return this
  }

  boolean(): ValidationBuilder {
    if (this.value) this.validators.push(new BooleanValidatorAdapter(this.value))
    return this
  }

  enumEqual(enumType: ValueType): ValidationBuilder {
    if (this.value) {
      if (enumType && Object.values(enumType).includes(this.value)) {
        return this
      }
      this.validators.push(new EnumValidatorAdapter(enumType))
    }
    return this
  }

  schema<T>(schema: Array<keyof T>): ValidationBuilder {
    if (this.value) {
      this.validators.push(new SchemaValidatorAdapter(Array.from(new Set(schema)), this.value))
    }
    return this
  }


  build(): IValidator[] {
    return this.validators
  }
}
