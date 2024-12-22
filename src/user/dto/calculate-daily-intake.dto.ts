import { ApiProperty } from '@nestjs/swagger'

import { Blood, Sex } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsIn, IsNumber, Min } from 'class-validator'

import { IsMinimumAge } from 'decorators'

import { ACTIVITY_LEVEL, ActivityLevel } from 'constants/activity-level'

export class CalculateDailyIntakeDto {
  @Min(150, { message: 'Height should be at least 150 cm' })
  @IsNumber()
  @ApiProperty({ example: 170 })
  height: number

  @Min(35, { message: 'Current weight should be at least 35 kg' })
  @IsNumber()
  @ApiProperty({ example: 83 })
  currentWeight: number

  @Min(35, { message: 'Desired weight should be at least 35 kg' })
  @IsNumber()
  @ApiProperty({ example: 80 })
  desiredWeight: number

  @IsDateString()
  @IsMinimumAge(16)
  @ApiProperty({ example: '2008-10-21' })
  birthday: string

  // eslint-disable-next-line @darraghor/nestjs-typed/all-properties-have-explicit-defined
  @IsEnum(Blood)
  @Type(() => String)
  @ApiProperty({ example: 'B' })
  blood: Blood

  @IsEnum(Sex)
  @ApiProperty({ example: 'male' })
  sex: Sex

  @IsIn(ACTIVITY_LEVEL)
  @Type(() => Number)
  @ApiProperty({ example: 3 })
  activityLevel: ActivityLevel
}
