import { Field, InputType, Int } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

import { RECOMMENDED_BY_BLOOD, RecommendedByBlood } from 'common/constants'

@InputType()
export class SearchProductInput {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field({ nullable: true })
  title?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field({ nullable: true })
  category?: string

  @IsIn(RECOMMENDED_BY_BLOOD)
  @IsOptional()
  @Field({ nullable: true, defaultValue: 'All' })
  recommendedByBlood?: RecommendedByBlood = 'All'

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Field(() => Int, { nullable: true, defaultValue: 9 })
  perPage = 9
}
