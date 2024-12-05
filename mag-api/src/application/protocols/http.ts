export type HttpRequest<T = any> = {
  method?: string
  path?: string
  headers?: T
  body?: T
  file?: T
  files?: T
  params?: T
  query?: T
}

export type HttpResponse = {
  statusCode: number
  data: any
}
