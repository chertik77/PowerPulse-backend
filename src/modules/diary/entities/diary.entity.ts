import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql'

import { DiaryExercise } from './diary-exercise.entity'
import { DiaryProduct } from './diary-product.entity'

@ObjectType()
export class Diary {
  @Field(() => ID)
  id: string

  @Field()
  userId: string

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field(() => [DiaryProduct])
  products: DiaryProduct[]

  @Field(() => [DiaryExercise])
  exercises: DiaryExercise[]

  @Field(() => Int)
  caloriesConsumed: number

  @Field(() => Int)
  caloriesBurned: number

  @Field(() => Int)
  caloriesRemaining: number

  @Field(() => Int)
  exerciseTimeRemaining: number
}
