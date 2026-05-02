import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { ExerciseFilterType } from 'common/constants'

@ObjectType()
export class ExerciseFilter {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  type: ExerciseFilterType

  @Field()
  imgUrl: string
}

@ObjectType()
export class ExerciseFilterResponse {
  @Field(() => Int)
  totalPages: number

  @Field(() => Int)
  totalRecords: number

  @Field(() => Int)
  page: number

  @Field(() => [ExerciseFilter])
  records: ExerciseFilter[]
}
