import app from '@/main/config/app'
import request from 'supertest'

export const apiTests = request(app)
