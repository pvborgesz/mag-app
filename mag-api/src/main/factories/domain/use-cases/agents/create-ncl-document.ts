import { CreateNclDocumentUseCase } from '@/domain/use-cases/create-ncl-document/create-ncl-document-use-case'
import { makePromptFormatterService } from '../../services/prompt-formatter'
import { makeChatGptGateway } from '@/main/factories/infrastructure/gateways'
import { makeValidateDocumentService } from '../../services/validate-document'

export const makeCreateNclDocumentUseCase = (): CreateNclDocumentUseCase => {
  return new CreateNclDocumentUseCase(makePromptFormatterService(), makeChatGptGateway(), makeValidateDocumentService())
}
