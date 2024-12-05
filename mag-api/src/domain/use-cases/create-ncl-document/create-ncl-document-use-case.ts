import { IAgentService } from '@/domain/contracts/agents/services/call-agent-service'
import { IPromptFormatterService } from '@/domain/contracts/agents/services/prompt-formatter-service'
import { ICreateNclDocumentUseCase } from '@/domain/contracts/agents/use-cases/create-ncl-document'
import { Prompt } from '@/domain/contracts/agents/value-objects'
import type { IValidateDocumentService } from '@/domain/contracts/validators/services/validate-document-service'
import { formatStructurePrompt, correctionPrompt } from '@/shared/utils'

type Input = ICreateNclDocumentUseCase.Params
type Output = ICreateNclDocumentUseCase.Result

export class CreateNclDocumentUseCase implements ICreateNclDocumentUseCase {
  constructor(
    private readonly promptFormatterService: IPromptFormatterService,
    private readonly agentService: IAgentService,
    private readonly validatorService: IValidateDocumentService
  ) {}

  async execute(input: Input): Promise<Output> {
    const { links, media, regionsDescriptors } = await this.promptFormatterService.formatPrompt({
      prompt: new Prompt(input.prompt)
    })

    const structurePrompt = new Prompt(
      formatStructurePrompt(media.getValue(), regionsDescriptors.getValue(), links.getValue())
    )

    let result = await this.agentService.callAgent({ prompt: structurePrompt })

    const maxAttempts = 5
    let attempts = 0

    while (attempts < maxAttempts) {
      const validateCode = await this.validatorService.validate({ document: result })
      if (!validateCode || validateCode.length === 0) {
        // Documento validado sem erros
        break
      }
      attempts++

      const correctedValue = new Prompt(correctionPrompt(validateCode.join('\n'), result))
      result = await this.agentService.callAgent({ prompt: correctedValue })
    }

    return {
      nclDocument: result
    }
  }
}
