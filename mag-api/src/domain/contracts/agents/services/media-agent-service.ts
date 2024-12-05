import { Prompt } from '../value-objects'

export interface IMediaAgentService {
  callAgent: (params: IMediaAgentService.Params) => Promise<IMediaAgentService.Result>
}

export namespace IMediaAgentService {
  export type Params = { prompt: Prompt }

  export type Result = string
}
