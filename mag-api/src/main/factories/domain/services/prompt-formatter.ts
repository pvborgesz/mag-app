import { PromptFormatterService } from '@/domain/services/agents/prompt-formatter/prompt-formatter-service'
import { makeChatGptGateway } from '../../infrastructure/gateways'

export const makePromptFormatterService = (): PromptFormatterService => {
  return new PromptFormatterService(makeChatGptGateway())
}
