interface IChoice {
  index: number
  message: IMessage
  logprobs: null
  finish_reason: string
}

interface IMessage {
  content: string
  role: string
}

interface IUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface IGptResult {
  id: string
  object: string
  created: number
  model: string
  choices: IChoice[]
  usage: IUsage
  system_fingerprint: string
}
