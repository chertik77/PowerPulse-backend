import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class SearchExerciseDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'chest' })
  bodyPart?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'barbell' })
  equipment?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'lats' })
  target?: string

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