import { Prompt } from '../value-objects'

export abstract class IAgentService {
  abstract callAgent(params: IAgentService.Params): Promise<IAgentService.Result>
}

export namespace IAgentService {
  export type Params = {
    prompt: Prompt | Prompt[]
  }

  export type Result = string
}
