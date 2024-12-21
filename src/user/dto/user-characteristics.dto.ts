import { ApiProperty } from '@nestjs/swagger'

import { Sex } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDateString, IsEnum, IsIn, IsNumber, Min } from 'class-validator'
import { ACTIVITY_LEVEL, ActivityLevel } from 'constants/activityLevel'
import { BLOOD, Blood } from 'constants/blood'

import { IsMinimumAge } from 'decorators'

export class UserCharacteristicsDto {
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

  @IsIn(BLOOD)
  @Type(() => Number)
  @ApiProperty({ example: 2 })
  blood: Blood

  @IsEnum(Sex)
  @ApiProperty({ example: 'male' })
  sex: Sex

  @IsIn(ACTIVITY_LEVEL)
  @Type(() => Number)
  @ApiProperty({ example: 3 })
  activityLevel: ActivityLevel
}
