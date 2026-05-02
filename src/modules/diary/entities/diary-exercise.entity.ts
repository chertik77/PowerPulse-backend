import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { Exercise } from 'modules/exercises/entitites/exercise.entity'

@ObjectType()
export class DiaryExercise extends Exercise {
  @Field(() => ID)
  id: string

  @Field()
  exerciseId: string

  @Field()
  diaryId: string
}

@ObjectType()
export class AddExerciseResponse extends DiaryExercise {
  @Field(() => Int)
  duration: number

  @Field(() => Int)
  burnedCalories: number
}
