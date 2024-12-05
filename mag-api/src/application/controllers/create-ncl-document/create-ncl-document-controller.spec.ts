import { HttpRequest } from '@/application/protocols'
import { ICreateNclDocumentUseCase } from '@/domain/contracts/agents/use-cases/create-ncl-document'
import { mock, MockProxy } from 'jest-mock-extended'
import { CreateNclDocumentController } from './create-ncl-document-controller'

describe('CreateNclDocumentController', () => {
  let httpRequest: HttpRequest<ICreateNclDocumentUseCase.Params>
  let createNclDocumentUseCase: MockProxy<ICreateNclDocumentUseCase>
  let sut: CreateNclDocumentController

  beforeAll(() => {
    httpRequest = {
      body: {
        prompt: 'any_prompt'
      } as ICreateNclDocumentUseCase.Params
    }
    createNclDocumentUseCase = mock()
    createNclDocumentUseCase.execute.mockResolvedValue({ nclDocument: 'any_ncl_document' })
  })

  beforeEach(() => {
    sut = new CreateNclDocumentController(createNclDocumentUseCase)
  })

  it('Should call CreateNclDocumentController with correct values', async () => {
    await sut.handle(httpRequest)
    expect(createNclDocumentUseCase.execute).toHaveBeenCalledTimes(1)
    expect(createNclDocumentUseCase.execute).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return an object and status 200 on success', async () => {
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })
})
