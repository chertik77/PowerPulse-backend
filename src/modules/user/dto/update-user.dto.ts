import { ApiPropertyOptional } from '@nestjs/swagger'

import { Blood, Sex } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  Min,
  MinLength
} from 'class-validator'

import { ACTIVITY_LEVEL, ActivityLevel } from 'common/constants'
import { IsMinimumAge } from 'common/decorators'

export class UpdateUserDto {
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ example: 'Jake' })
  name?: string

  @IsEmail()
  @Type(() => String)
  @IsOptional()
  email?: string

  @Min(150, { message: 'Height should be at least 150 cm' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ example: 180 })
  height?: number

  @Min(35, { message: 'Current weight should be at least 35 kg' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ example: 75 })
  currentWeight?: number

  @Min(35, { message: 'Desired weight should be at least 35 kg' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ example: 70 })
  desiredWeight?: number

  @IsDateString()
  @IsMinimumAge(16)
  @Type(() => String)
  @IsOptional()
  birthday?: string

  @IsEnum(Blood)
  @Type(() => String)
  @IsOptional()
  @ApiPropertyOptional({ example: 4 })
  blood?: Blood

  @IsEnum(Sex)
  @Type(() => String)
  @IsOptional()
  sex?: Sex

  @IsIn(ACTIVITY_LEVEL)
  @Type(() => Number)
  @IsOptional()
  activityLevel?: ActivityLevel
}
