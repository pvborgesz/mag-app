export interface IHttpGetClient {
  get<T = any>(params: IHttpGetClient.Input): Promise<IHttpGetClient.Output<T>>
  getArraybuffer<T = any>(url: string): Promise<IHttpGetClient.Output<T>>
}

export namespace IHttpGetClient {
  export type Input = {
    url: string
    params?: object
    headers?: object
    httpsAgent?: boolean
  }
  export type Output<T = any> = T
}
