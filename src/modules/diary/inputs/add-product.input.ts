import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import { IsDate, IsNumber, IsString, Min } from 'class-validator'

@InputType()
export class AddProductInput {
  @IsString()
  @Field()
  productId: string

  @IsDate()
  @Type(() => Date)
  @Field(() => GraphQLISODateTime)
  date: Date

  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int)
  weight: number

  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int)
  calories: number
}
