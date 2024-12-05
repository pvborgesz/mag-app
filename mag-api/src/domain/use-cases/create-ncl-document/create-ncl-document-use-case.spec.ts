import { ICallAgentUseCase } from '@/domain/contracts/agents/use-cases/agents/create-ncl-document'
import { ModelConfig } from '@/domain/contracts/agents/use-cases/agents/value-objects'
import { ICallAgentGateway } from '@/domain/protocols/gateways/call-agent-gateway'
import { ModelTypeEnum } from '@/types'
import { MockProxy, mock } from 'jest-mock-extended'
import { CallAgentUseCase } from './create-ncl-document-use-case'

describe('CallAgentUseCase', () => {
  let input: ICallAgentUseCase.Params
  let callAgentRepository: MockProxy<ICallAgentGateway>
  let sut: CallAgentUseCase

  beforeAll(() => {
    input = {
      prompt: 'any_prompt',
      modelConfig: new ModelConfig(ModelTypeEnum.GPT3, ModelTypeEnum.GPT3),
    }
    callAgentRepository = mock()
    callAgentRepository.call.mockResolvedValue('any_response')
  })

  beforeEach(() => {
    sut = new CallAgentUseCase(callAgentRepository)
  })

  it('Should be able call CallAgentUseCase with correct values', async () => {
    await sut.execute(input)
    expect(callAgentRepository.call).toHaveBeenCalledTimes(1)
    expect(callAgentRepository.call).toHaveBeenCalledWith(input)
  })

  it('Should throw if callAgentRepository throws', async () => {
    callAgentRepository.call.mockRejectedValueOnce(new Error())
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('Should return a true object on success', async () => {
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
  })
})
