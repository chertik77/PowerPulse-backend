import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  bodyPart: string

  @Field(() => Int)
  burnedCalories: number

  @Field()
  equipment: string

  @Field()
  gifUrl: string

  @Field()
  target: string

  @Field(() => Int, { defaultValue: 3 })
  duration = 3
}

@ObjectType()
export class ExercisesResponse {
  @Field(() => Int)
  totalPages: number

  @Field(() => Int)
  totalRecords: number

  @Field(() => Int)
  page: number

  @Field(() => [Exercise])
  records: Exercise[]
}
