export interface ICreateNclDocumentUseCase {
  execute(input: ICreateNclDocumentUseCase.Params): Promise<ICreateNclDocumentUseCase.Result>
}

export namespace ICreateNclDocumentUseCase {
  export type Params = {
    prompt: string
  }

  export type Result = { nclDocument: string }
}
