import { AxiosHttpClient } from '@/infrastructure/gateways/axios'

export const makeHttpClientGateway = () => {
  return new AxiosHttpClient()
}
