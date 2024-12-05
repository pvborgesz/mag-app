import { IHttpGetClient } from './get'
import { IHttpPostClient } from './post'

export interface IHttpClient {
  post<T = any>(params: IHttpPostClient.Input): Promise<IHttpPostClient.Output<T>>
  get<T = any>(params: IHttpGetClient.Input): Promise<IHttpGetClient.Output<T>>
  getArraybuffer<T = any>(url: string): Promise<IHttpGetClient.Output<T>>
}
