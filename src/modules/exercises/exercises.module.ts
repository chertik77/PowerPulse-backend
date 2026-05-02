import { Module } from '@nestjs/common'

import { ExercisesResolver } from './exercises.resolver'
import { ExercisesService } from './exercises.service'

@Module({
  providers: [ExercisesResolver, ExercisesService]
})
export class ExercisesModule {}
