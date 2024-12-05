import { errorHandler } from '@/infrastructure/http/middlewares/error-handler'
import { agentRoutes } from '@/infrastructure/http/routes/agent-routes'
import express from 'express'

const app = express()

app.use(express.json())
app.use('/api', agentRoutes)
app.use(errorHandler)

export { app }
