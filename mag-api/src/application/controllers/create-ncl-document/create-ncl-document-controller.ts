import { ok } from '@/application/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import { ValidationBuilder as B } from '@/application/validation/builder'
import { IValidator } from '@/application/validation/contracts/validator'
import { ICreateNclDocumentUseCase } from '@/domain/contracts/agents/use-cases/create-ncl-document'

export class CreateNclDocumentController extends Controller {
  constructor(private readonly createNclDocumentUseCase: ICreateNclDocumentUseCase) {
    super()
  }

  override buildValidators(httpRequest: HttpRequest): IValidator[] {
    const { prompt } = httpRequest.body as ICreateNclDocumentUseCase.Params
    return [...B.of(prompt).build()]
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const output = await this.createNclDocumentUseCase.execute(httpRequest.body)
    return ok(output)
  }
}
