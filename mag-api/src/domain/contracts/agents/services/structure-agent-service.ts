import { Prompt } from '../value-objects'

export interface IStructureAgentService {
  callAgent: (params: IStructureAgentService.Params) => Promise<IStructureAgentService.Result>
}

export namespace IStructureAgentService {
  export type Params = { prompt: Prompt }

  export type Result = string
}
