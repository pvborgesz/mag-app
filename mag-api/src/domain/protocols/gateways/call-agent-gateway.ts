import { IAgentService } from '@/domain/contracts/agents/services/call-agent-service'

export interface ICallAgentGateway {
  callAgent(params: IAgentService.Params): Promise<IAgentService.Result>
}
