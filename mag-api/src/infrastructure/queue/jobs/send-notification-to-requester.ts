/* eslint-disable no-console */
import { IJob } from '@/application/protocols/queue'
import { Job, JobOptions } from 'bull'

export const SendNotificationToRequester: IJob<Job, JobOptions> = {
  name: 'SendNotificationToRequester',
  async handle({ data }): Promise<void> {
    console.log('DATA', data)
  },
  options: {
    delay: 5000,
    attempts: 3,
  },
}
