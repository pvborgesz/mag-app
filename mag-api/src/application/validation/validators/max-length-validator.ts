import { InvalidParamError } from "@/shared/helpers/errors"
import { IValidator } from "../contracts/validator"


export class MaxLengthValidator implements IValidator {
  constructor(private readonly value: string, private readonly max: number) {}

  validate(): Error | undefined {
    if (!this.value) return undefined
    if (this.value.length <= this.max) return undefined
    return new InvalidParamError(
      `'${this.value}' ultrapassou o valor máximo. Tem ${this.value.length}, Max.: ${this.max}`,
    )
  }
}
