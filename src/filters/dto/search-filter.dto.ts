import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { IsIn, IsNumber, IsOptional } from 'class-validator'

import { FILTER_TYPE, FilterType } from 'constants/filter-type'

export class SearchFilterDto {
  @IsIn(FILTER_TYPE)
  @IsOptional()
  @Type(() => String)
  @ApiPropertyOptional({ default: 'Body parts', enum: FILTER_TYPE })
  filter?: FilterType = 'Body parts'

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: 'number', default: 1, required: false })
  page = 1

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ type: 'number', default: 10, required: false })
  limit = 10
}
