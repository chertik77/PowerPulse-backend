import { Field, InputType, Int } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import { IsIn, IsNumber, IsOptional } from 'class-validator'

import { EXERCISE_FILTER_TYPES, ExerciseFilterType } from 'common/constants'

@InputType()
export class SearchExerciseFiltersByTypeInput {
  @IsIn(EXERCISE_FILTER_TYPES)
  @IsOptional()
  @Field({ defaultValue: 'Body parts' })
  type?: ExerciseFilterType = 'Body parts'

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { defaultValue: 1 })
  page = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { defaultValue: 10 })
  perPage = 10
}
