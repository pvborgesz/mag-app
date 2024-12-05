import type { IValidateDocumentService } from '@/domain/contracts/validators/services/validate-document-service'
import { ValidateDocumentService } from '@/domain/services/validators/validate-document/validate-document-service'

export const makeValidateDocumentService = (): IValidateDocumentService => {
  return new ValidateDocumentService()
}
