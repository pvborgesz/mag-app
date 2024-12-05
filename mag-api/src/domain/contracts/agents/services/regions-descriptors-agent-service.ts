import { Prompt } from '../value-objects'

export interface IRegionsDescriptorsAgentService {
  callAgent: (
    params: IRegionsDescriptorsAgentService.Params,
  ) => Promise<IRegionsDescriptorsAgentService.Result>
}

export namespace IRegionsDescriptorsAgentService {
  export type Params = { prompt: Prompt }

  export type Result = string
}
