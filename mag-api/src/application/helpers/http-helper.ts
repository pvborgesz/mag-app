/* eslint-disable @typescript-eslint/no-explicit-any */

import { ForbiddenError, ServerError, UnauthorizedError } from "@/shared/helpers/errors"

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export function badRequest(error: Error): HttpResponse<Error> {
  return {
    statusCode: 400,
    data: error,
  }
}

export function notFound(error: Error): HttpResponse<Error> {
  return {
    statusCode: 404,
    data: error,
  }
}

export function unauthorized(): HttpResponse<Error> {
  return {
    statusCode: 401,
    data: new UnauthorizedError(),
  }
}
export function forbidden(error?: Error): HttpResponse<Error> {
  return {
    statusCode: 403,
    data: new ForbiddenError(error?.message),
  }
}
export function serverError(error: unknown): HttpResponse<Error> {
  return {
    statusCode: 500,
    data: new ServerError(error instanceof Error ? error : undefined),
  }
}

export function ok(data: any): HttpResponse<Error> {
  return {
    statusCode: 200,
    data,
  }
}
