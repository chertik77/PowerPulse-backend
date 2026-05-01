import type { ActivityLevel } from 'common/constants'

import { Field, InputType, Int } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsIn, IsNumber, Min } from 'class-validator'
import { Blood, Sex } from 'generated/prisma/enums'

import { ACTIVITY_LEVEL } from 'common/constants'
import { IsMinAge } from 'common/decorators'

@InputType()
export class CalculateDailyIntakeInput {
  @Min(150, { message: 'Height should be at least 150 cm' })
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int)
  height: number

  @Min(35, { message: 'Current weight should be at least 35 kg' })
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int)
  currentWeight: number

  @Min(35, { message: 'Desired weight should be at least 35 kg' })
  @IsNumber()
  @Type(() => Number)
  @Field(() => Int)
  desiredWeight: number

  @IsDate()
  @Type(() => Date)
  @IsMinAge(16)
  @Field()
  birthday: Date

  @IsEnum(Blood)
  @Field(() => Blood)
  blood: Blood

  @IsEnum(Sex)
  @Field(() => Sex)
  sex: Sex

  @IsIn(ACTIVITY_LEVEL)
  @Type(() => Number)
  @Field(() => Int)
  activityLevel: ActivityLevel
}
