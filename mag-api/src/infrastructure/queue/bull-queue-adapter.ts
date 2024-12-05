/* eslint-disable no-console */
import IQueue, { IJob } from '@/application/protocols/queue'
import Bull, { Job, JobOptions, Queue, QueueOptions } from 'bull'

type QueueType = {
  main: Queue
  name: string
  handle: (item: any) => Promise<void>
  options?: JobOptions
}

export default class BullQueueAdapter implements IQueue {
  readonly queues: QueueType[]

  readonly queueOptions: QueueOptions

  constructor(jobs: IJob<Job, JobOptions>[]) {
    this.queues = jobs.map(job => {
      return {
        main: new Bull(job.name, this.queueOptions),
        name: job.name,
        handle: job.handle,
        options: job.options
      }
    })

    this.queueOptions = {
      prefix: 'bull',
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD
      }
    }
  }

  async add(name: string, item: any): Promise<void> {
    const findQueue = this.queues.find(queue => queue.name === name)
    if (findQueue) {
      findQueue.main.add(item, findQueue.options)
    }
  }

  process(): void {
    this.queues.forEach(queue => {
      queue.main.process(queue.handle)
      queue.main.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data)
        console.error(err)
      })
    })
  }
}
