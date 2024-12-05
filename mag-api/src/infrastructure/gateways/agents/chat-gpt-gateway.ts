import { IAgentService } from '@/domain/contracts/agents/services/call-agent-service'
import { ICallAgentGateway } from '@/domain/protocols/gateways/call-agent-gateway'
import { IHttpClient } from '@/infrastructure/helpers/client'
import { IGptResult } from './models/chat-gpt-types'

export class ChatGptGateway implements ICallAgentGateway {
  private httpRequest: IHttpClient

  constructor(httpRequest: IHttpClient) {
    this.httpRequest = httpRequest
  }

  async callAgent(params: IAgentService.Params): Promise<IAgentService.Result> {
    try {
      const messages = Array.isArray(params.prompt)
        ? params.prompt.map(p => ({ role: 'user', content: p.getValue() }))
        : [{ role: 'user', content: params.prompt.getValue() }]

      const response: IGptResult = await this.httpRequest.post({
        url: String(process.env.GPT_URL_API),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GPT_API_KEY}`
        },
        data: {
          model: process.env.GPT_MODEL,
          messages: messages
          // TODO: test with temperatures and max_tokens params
        }
      })

      if (!response.choices || !response.choices[0].message || !response.choices[0].message.content) {
        throw new Error('Invalid API response format')
      }

      return response.choices[0].message.content
    } catch (error: Error | any) {
      console.error('Error calling agent:', error)
      if (error.response) {
        console.error('API Response Error:', error.response.data)
        throw new Error(`Agent call failed: ${error.response.data.error.message}`)
      } else if (error.request) {
        console.error('API Request Error:', error.request)
        throw new Error('Agent call failed: No response received from API')
      } else {
        console.error('Unknown Error:', error.message)
        throw new Error(`Agent call failed: ${error.message}`)
      }
    }
  }
}
