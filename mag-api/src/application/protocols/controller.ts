import { ValidationComposite } from '@/application/validation/composite'

import { AppError, ForbiddenError, NotFoundError } from '@/shared/helpers/errors'
import { badRequest, forbidden, notFound, serverError } from '../helpers/http-helper'
import { IValidator } from '../validation/contracts/validator'
import { HttpRequest, HttpResponse } from './http'


export abstract class Controller {
  env = { appEnv: process.env.APP_ENVIRONMENT, nodeEnv: process.env.NODE_ENV }


  abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate(httpRequest)
      if (error) return badRequest(error)
      const execute = await this.perform(httpRequest)
      return execute
    } catch (err) {
      const error = err as Error
      if (this.env.nodeEnv !== 'test') console.error(err)
      if (err instanceof NotFoundError) return notFound(error)
      if (err instanceof ForbiddenError) return forbidden(error)
      if (err instanceof AppError) return badRequest(error)
      return serverError(error)
    }
  }

  buildValidators(_httpRequest: HttpRequest): IValidator[] {
    return []
  }

  private validate(httpRequest: HttpRequest): Error | undefined {
    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}

