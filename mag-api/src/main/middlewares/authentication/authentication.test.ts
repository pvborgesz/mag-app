// import { ForbiddenError } from '@/domain/entities/errors'
// import { UsersRoleEnum } from '@/domain/shared/concerns/EnumTypes'
// import app from '@/main/config/app'
// import { env } from '@/main/config/env'
// import { auth } from '@/main/middlewares/authentication/authentication'
// import { sign } from 'jsonwebtoken'
// import request from 'supertest'

// describe('Authentication Middleware', () => {
//   const payload = { role: UsersRoleEnum.ADMIN, sub: 'any_user_id' }
//   const expiresIn = '365d'
//   test('should return 403 if authorization header was not provided', async () => {
//     app.get('/test', auth)
//     const api = request(app)
//     const { status, body } = await api.get(`/test`)
//     expect(status).toBe(403)
//     expect(body.error).toBe(new ForbiddenError().message)
//   })
//   test('should return 200 if authorization header is valid', async () => {
//     const authorization = sign(payload, env.jwtSecret, {
//       expiresIn,
//     })

//     app.get('/test', auth, (req, res) => {
//       res.json(req.user)
//     })

//     const { status, body } = await request(app).get('/test').set({ authorization })

//     expect(status).toBe(200)
//     expect(body).toEqual({
//       role: 'admin',
//       id: 'any_user_id',
//     })
//   })
// })
