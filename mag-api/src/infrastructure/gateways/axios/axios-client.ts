import {
  IHttpPostClient,
  IHttpGetClient,
  IHttpPutClient,
  IHttpDeleteClient
} from '@/infrastructure/helpers/client'
import axios from 'axios'
import http from 'http'
import https from 'https'

export class AxiosHttpClient implements IHttpPostClient, IHttpGetClient, IHttpPutClient, IHttpDeleteClient {
  private httpAgent: http.Agent

  private httpsAgent: https.Agent

  constructor() {
    this.httpAgent = new http.Agent({ keepAlive: true })
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      keepAlive: true
    })
  }

  public async delete<T = any>(params: IHttpDeleteClient.Params): Promise<T> {
    const { data } = await axios.delete(params.url, {
      headers: params.headers || {},
      data: params.data || {},
      httpAgent: params.url.startsWith('https') ? undefined : this.httpAgent,
      httpsAgent: params.url.startsWith('https') ? this.httpsAgent : undefined
    })
    return data
  }

  public async put<T = any>(params: IHttpPutClient.Params): Promise<T> {
    const { data } = await axios.put(params.url, params.data, {
      headers: params.headers || {},
      httpAgent: params.url.startsWith('https') ? undefined : this.httpAgent,
      httpsAgent: params.url.startsWith('https') ? this.httpsAgent : undefined
    })
    return data
  }

  async getArraybuffer<T = any>(url: string): Promise<T> {
    const api = axios.create({
      responseType: 'arraybuffer',
      httpAgent: url.startsWith('https') ? undefined : this.httpAgent,
      httpsAgent: url.startsWith('https') ? this.httpsAgent : undefined
    })
    const { data: arrayBuffer } = await api.get(url)
    return arrayBuffer
  }

  async get<T = any>({ url, params, headers }: IHttpGetClient.Input): Promise<T> {
    const response = await axios.get(url, {
      params,
      headers,
      httpAgent: url.startsWith('https') ? undefined : this.httpAgent,
      httpsAgent: url.startsWith('https') ? this.httpsAgent : undefined
    })
    return response.data
  }

  public async post(params: IHttpPostClient.Input): Promise<any> {
    const { data } = await axios.post(params.url, params.data, {
      headers: params.headers || {},
      httpAgent: params.url.startsWith('https') ? undefined : this.httpAgent,
      httpsAgent: params.url.startsWith('https') ? this.httpsAgent : undefined
    })
    return data
  }
}
