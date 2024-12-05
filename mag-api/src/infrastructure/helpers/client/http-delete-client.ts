export interface IHttpDeleteClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T = any>(params: IHttpDeleteClient.Params): Promise<T>
}

export namespace IHttpDeleteClient {
  export type Params = {
    url: string
    data?: any
    headers?: object
    httpsAgent?: boolean
  }
}
