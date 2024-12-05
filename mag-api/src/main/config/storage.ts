/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IStorageConfig {
  driver: 'disk' | 's3'
  tmpFolder: string
  disk: {
    uploadsFolder: string
  }
  aws: {
    bucket: string
    region: string
  }
  multer: {
    storage: StorageEngine
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  disk: {
    uploadsFolder: path.resolve(tmpFolder)
  },
  aws: {
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_S3_REGION
  },
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req: any, file: any, cb: any) => {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const filename = `${fileHash}-${file.originalname.split(' ').join('-').toLowerCase()}`

        return cb(null, filename)
      }
    })
  }
} as IStorageConfig
