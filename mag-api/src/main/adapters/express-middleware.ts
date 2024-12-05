import { IMiddleware } from '@/application/middlewares/contracts/middleware'
import { UsersRoleEnum } from '@/domain/shared/concerns/EnumTypes'
import { RequestHandler } from 'express'

type Adapter = (middleware: IMiddleware) => RequestHandler
type TokenPayload = {
  sub: string
  role: UsersRoleEnum
  vehicle_id?: string
}

export const adaptExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  const { data, statusCode } = await middleware.handle({
    ...req.headers,
  })
  if (statusCode === 200) {
    const entries = Object.entries(data).filter(entry => entry[1])
    const { sub, role, vehicle_id } = Object.fromEntries(entries) as TokenPayload
    req.user = {
      id: sub,
      role,
      vehicle_id,
    }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
