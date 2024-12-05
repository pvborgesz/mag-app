import { IHttpClient } from "@/infrastructure/helpers/client";
import { AgentGateway } from "./chat-gpt-gateway";

describe('AgentGateway', () => {
  let sut: AgentGateway;
  let httpClient: IHttpClient;

  beforeAll(() => {
    httpClient = {
      post: jest.fn().mockResolvedValue({ data: {} })
    };
  });

  beforeEach(() => {
    sut = new AgentGateway(httpClient);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('agent()', () => {
    it('should call the HTTP client with correct values', async () => {
      const params: IAgentUseCase.Params = { /* mock params */ };
      await sut.agent(params);
      expect(httpClient.post).toHaveBeenCalledWith({
        url: 'https://api.example.com/agent',
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    it('should return the data from the HTTP client', async () => {
      const params: IAgentUseCase.Params = { /* mock params */ };
      const result = await sut.agent(params);
      expect(result).toEqual({ data: {} });
    });
  });
});
