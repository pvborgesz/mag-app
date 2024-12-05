import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeCreateNclDocumentController } from '@/main/factories/application/agents'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/create-ncl-document', adaptRoute(makeCreateNclDocumentController()))
}
