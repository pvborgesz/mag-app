import { IPromptFormatterService } from '@/domain/contracts/agents/services/prompt-formatter-service'
import { Prompt } from '@/domain/contracts/agents/value-objects'
import { ICallAgentGateway } from '@/domain/protocols/gateways/call-agent-gateway'
import {
  formatRegionsAndDescriptorsPrompt,
  formatMediaPrompt,
  formatLinksPrompt,
  ConnectorsEnum,
  connectorsMap
} from '@/shared/utils'

export class PromptFormatterService implements IPromptFormatterService {
  constructor(private readonly agentGateway: ICallAgentGateway) {}

  async formatPrompt({ prompt }: IPromptFormatterService.Params): Promise<IPromptFormatterService.Result> {
    const promptValue = prompt.getValue()

    const [regionsDescriptorsResult, mediaResult] = await Promise.all([
      this.agentGateway.callAgent({ prompt: new Prompt(formatRegionsAndDescriptorsPrompt(promptValue)) }),
      this.agentGateway.callAgent({ prompt: new Prompt(formatMediaPrompt(promptValue)) })
    ])

    const regionsDescriptors = new Prompt(regionsDescriptorsResult)
    const media = new Prompt(mediaResult)

    const linksResult = await this.agentGateway.callAgent({
      prompt: [
        new Prompt(
          formatLinksPrompt(
            `${promptValue}\n\n${regionsDescriptors.getValue()}\n${media.getValue()}`,
            ConnectorsEnum
          )
        )
      ]
    })

    const linksArray = linksResult.split('\n')

    const links = linksArray.map((link: string) => {
      const connectorKey = link as keyof typeof ConnectorsEnum
      const connectorString = connectorsMap[connectorKey] || ''
      return connectorString ? connectorString : link
    })

    return {
      links: new Prompt(links.join('\n')),
      regionsDescriptors,
      media
    }
  }
}
