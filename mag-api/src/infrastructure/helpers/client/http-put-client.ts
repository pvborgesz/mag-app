export interface IHttpPutClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T = any>(params: IHttpPutClient.Params): Promise<T>
}

export namespace IHttpPutClient {
  export type Params = {
    url: string
    data: any
    headers?: object
    httpsAgent?: boolean
  }
}
