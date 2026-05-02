import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { DailyIntakeFormCompletionGuard, JwtAuthGuard } from 'common/guards'

import { ExerciseFilterResponse } from './entitites/exercise-filter.entity'
import { ExercisesResponse } from './entitites/exercise.entity'
import { ExercisesService } from './exercises.service'
import { SearchExercisesByBodyPartInput } from './inputs/search-exercises-by-body-part.input'
import { SearchExerciseFiltersByTypeInput } from './inputs/search-exercises-by-type.input'

@UseGuards(JwtAuthGuard, DailyIntakeFormCompletionGuard)
@Resolver()
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Query(() => ExercisesResponse)
  async exercisesByBodyPart(
    @Args('search') search: SearchExercisesByBodyPartInput
  ) {
    return await this.exercisesService.getExercisesByBodyPart(search)
  }

  @Query(() => ExerciseFilterResponse)
  async exerciseFiltersByType(
    @Args('search') search: SearchExerciseFiltersByTypeInput
  ) {
    return await this.exercisesService.getExerciseFiltersByType(search)
  }
}
