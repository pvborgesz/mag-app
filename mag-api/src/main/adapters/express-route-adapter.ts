import { Controller, HttpRequest } from '@/application/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      user: req.user,
      files: req.files,
      path: req.path,
      headers: req.headers,
      method: req.method,
    }
    try {
      const httpResponse = await controller.handle(httpRequest)
      let { data } = httpResponse

      if (data instanceof Error) data = data.message

      if (!res.headersSent) {
        return res.status(httpResponse.statusCode).json({
          statusCode: httpResponse.statusCode,
          data,
        })
      }
    } catch (error) {
      if (!res.headersSent) {
        return res.status(500).json({
          statusCode: 500,
          data: 'Internal server error',
        })
      }
    }
  }
}
