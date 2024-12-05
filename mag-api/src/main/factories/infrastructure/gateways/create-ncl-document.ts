import { ChatGptGateway } from '@/infrastructure/gateways/agents/chat-gpt-gateway'
import { makeHttpClientGateway } from './http-client'

export const makeChatGptGateway = (): ChatGptGateway => {
  return new ChatGptGateway(makeHttpClientGateway())
}
