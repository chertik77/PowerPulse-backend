import { Field, InputType, Int } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class SearchExercisesByBodyPartInput {
  @IsString()
  @Field()
  bodyPart: string

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { defaultValue: 1 })
  page = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { defaultValue: 9 })
  perPage = 9
}
