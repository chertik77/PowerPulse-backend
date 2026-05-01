import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DailyIntake {
  @Field(() => Int)
  dailyCalorieIntake: number

  @Field(() => Int)
  dailyExerciseTime: number
}
