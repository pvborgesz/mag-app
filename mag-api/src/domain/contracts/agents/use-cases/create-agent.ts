import { ModelConfig, Status } from '../value-objects'

export interface ICreateAgentUseCase {
  execute: (params: ICreateAgentUseCase.Params) => Promise<ICreateAgentUseCase.Result>
}

export namespace ICreateAgentUseCase {
  export type Params = {
    id: string
    name: string
    status: Status
    modelConfig: ModelConfig
  }

  export type Result = {
    id: string
    name: string
    status: Status
    modelConfig: ModelConfig
  }
}
