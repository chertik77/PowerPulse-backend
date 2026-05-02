import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import { IsDate } from 'class-validator'

@InputType()
export class GetDiaryInput {
  @IsDate()
  @Type(() => Date)
  @Field(() => GraphQLISODateTime)
  date: Date
}
