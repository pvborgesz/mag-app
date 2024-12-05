import { Express, Router } from 'express'
import fg from 'fast-glob'

export default async (app: Express) => {
  const router = Router()
  app.use(router)
  const files = fg.sync('**/src/main/routes/**/**.routes.ts')
  files.map(async file => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
