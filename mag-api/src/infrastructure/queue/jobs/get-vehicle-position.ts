/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IJob } from '@/application/protocols/queue'
// import { MotoristWaypointTypeEnum } from '@/domain/shared/concerns/EnumTypes'
// import { makeBuonnyClient } from '@/main/factories/infra/gateways/buonny-client'
// import { makePgMotoristWaypointRepository } from '@/main/factories/infra/repositories/postgres/motorists'
// import { makePgFreightRepository } from '@/main/factories/infra/repositories/postgres/operations'
import { Job, JobOptions } from 'bull'

// const geolocationGateway = makeBuonnyClient()
// const freightRepository = makePgFreightRepository()
// const motoristWaypointRepository = makePgMotoristWaypointRepository()

export const getVehiclePosition: IJob<Job, JobOptions> = {
  name: 'getVehiclePosition',
  async handle({ data }): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('DATA:', data)

    // const promises = []
    // const freightsMonitored = await freightRepository.listFreightMonitoredByBuonny()
    // for (const freight of freightsMonitored) {
    //   const position = await geolocationGateway.getPositions({
    //     license_plate: freight.vehicle!.license_plate,
    //   })
    //   const positionAlreadyExists = await motoristWaypointRepository.findPositionByOptions({
    //     waypoint_date: new Date(position.date),
    //     lat: Number(position.latitude),
    //     lng: Number(position.longitude),
    //     freight_id: freight.id,
    //     vehicle_id: freight.vehicle_id!,
    //     motorist_id: freight.motorist_id!,
    //     type: MotoristWaypointTypeEnum.BUONNY,
    //   })
    //   if (positionAlreadyExists === null) {
    //     promises.push(
    //       motoristWaypointRepository.create({
    //         waypoint_date: new Date(position.date),
    //         lat: Number(position.latitude),
    //         lng: Number(position.longitude),
    //         freight_id: freight.id,
    //         vehicle_id: freight.vehicle_id!,
    //         motorist_id: freight.motorist_id!,
    //         type: MotoristWaypointTypeEnum.BUONNY,
    //       }),
    //     )
    //   }
    // }
    // await Promise.all(promises)
  },
  options: {
    attempts: 3,
    repeat: { cron: '*/2 * * * *' },
  },
}
