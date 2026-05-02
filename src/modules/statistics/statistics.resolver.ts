import { Query, Resolver } from '@nestjs/graphql'

import { Statistics } from './entitites/statistics.entity'
import { StatisticsService } from './statistics.service'

@Resolver()
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Query(() => Statistics)
  async stats() {
    return await this.statisticsService.getStatistics()
  }
}
