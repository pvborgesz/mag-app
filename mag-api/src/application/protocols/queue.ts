export default interface IQueue {
  add(name: string, item: any, options?: any): Promise<void>
  process(): void
}

export interface IJob<JobType, JobOptions> {
  name: string
  handle(item: JobType): Promise<void>
  options?: JobOptions
}
