import { CreateNclDocumentController } from '@/application/controllers/create-ncl-document/create-ncl-document-controller'
import { makeCreateNclDocumentUseCase } from '../../domain/use-cases/agents'

export const makeCreateNclDocumentController = (): CreateNclDocumentController => {
  return new CreateNclDocumentController(makeCreateNclDocumentUseCase())
}
