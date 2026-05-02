import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Statistics {
  @Field(() => Int)
  totalExercises: number

  @Field(() => Int)
  totalUsers: number

  @Field(() => Int)
  totalWorkouts: number

  @Field(() => Int)
  totalBurnedCalories: number

  @Field(() => Int)
  totalWorkoutTime: number
}
