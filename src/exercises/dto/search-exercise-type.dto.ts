import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { IsIn, IsNumber, IsOptional } from 'class-validator'

import { FILTER_TYPE, FilterType } from 'constants/filter-type'

export class SearchExerciseTypeDto {
  @IsIn(FILTER_TYPE)
  @IsOptional()
  @Type(() => String)
  @ApiPropertyOptional({ default: 'Body parts', enum: FILTER_TYPE })
  type?: FilterType = 'Body parts'

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: 'number', default: 1, required: false })
  page = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: 'number', default: 10, required: false })
  perPage = 10
}
