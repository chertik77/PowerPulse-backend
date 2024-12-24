import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

import { OneOf } from 'common/decorators'

@OneOf(['bodyPart', 'equipment', 'target'])
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

  // eslint-disable-next-line @darraghor/nestjs-typed/all-properties-have-explicit-defined
  // @ValidateIf(o => !o.bodyPart && !o.equipment && !o.target)
  // @IsDefined({
  //   message:
  //     'Provide either bodyPart, equipment or target, and only one of them'
  // })
  // @Type(() => String)
  // protected readonly exactlyOne: undefined

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
