export interface IValidateDocumentService {
  validate: (params: IValidateDocumentService.Params) => Promise<IValidateDocumentService.Result>
}

export namespace IValidateDocumentService {
  export type Params = { document: string }
  export type Result = string[]
}
