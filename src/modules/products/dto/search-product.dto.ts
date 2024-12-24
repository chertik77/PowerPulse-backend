import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

import { RECOMMENDED_BY_BLOOD, RecommendedByBlood } from 'common/constants'

export class SearchProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Omelette' })
  title?: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: 'cereals' })
  category?: string

  @IsIn(RECOMMENDED_BY_BLOOD)
  @IsOptional()
  @Type(() => String)
  @ApiProperty({ default: 'All', enum: RECOMMENDED_BY_BLOOD, required: false })
  recommendedByBlood: RecommendedByBlood = 'All'

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: 'number', default: 1, required: false })
  page = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: 'number', default: 9, required: false })
  perPage = 9
}
