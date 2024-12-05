import { IJob } from '@/application/protocols/queue'
import BullQueueAdapter from '@/infrastructure/queue/bull-queue-adapter'
import * as jobsFiles from '@/infrastructure/queue/jobs'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { Job, JobOptions } from 'bull'

const jobs = Object.values(jobsFiles).map((job: IJob<Job, JobOptions>) => {
  return {
    name: job.name,
    handle: job.handle,
    options: job.options
  }
})

const queue = new BullQueueAdapter(jobs)

const jobQueues = queue.queues.map(queue => {
  return new BullAdapter(queue.main)
})

const queueAdapter = new ExpressAdapter()
queueAdapter.setBasePath('/admin/queues')

createBullBoard({
  queues: [...jobQueues],
  serverAdapter: queueAdapter
})

export { queue, queueAdapter }
