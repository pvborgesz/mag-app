export interface IHttpPostClient {
  post<T = any>(params: IHttpPostClient.Input): Promise<IHttpPostClient.Output<T>>
}

export namespace IHttpPostClient {
  export type Input = {
    url: string
    data: any
    headers?: object
    httpsAgent?: boolean
  }
  export type Output<T = any> = T
}
