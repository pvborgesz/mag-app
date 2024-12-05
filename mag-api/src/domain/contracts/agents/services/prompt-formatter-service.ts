import { Prompt } from '../value-objects'

export interface IPromptFormatterService {
  formatPrompt: (params: IPromptFormatterService.Params) => Promise<IPromptFormatterService.Result>
}

export namespace IPromptFormatterService {
  export type Params = { prompt: Prompt }

  export type Result = {
    regionsDescriptors: Prompt
    media: Prompt
    links: Prompt
  }
}
