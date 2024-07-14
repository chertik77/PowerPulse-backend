import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  Validate
} from 'class-validator'
import { activityLevel, blood, sex } from 'types'

import { Is16YearsOld } from 'decorators/age.decorator'

export class DailyCalorieIntake {
  @IsNumber()
  @Min(150)
  height: number

  @IsNumber()
  @Min(35)
  currentWeight: number

  @IsNumber()
  @Min(35)
  desiredWeight: number

  @IsDateString()
  @Validate(Is16YearsOld)
  birthday: string

  @IsNumber()
  @IsIn(blood)
  blood: 1 | 2 | 3 | 4

  @IsString()
  @IsIn(sex)
  sex: 'male' | 'female'

  @IsNumber()
  @IsIn(activityLevel)
  activityLevel: 1 | 2 | 3 | 4 | 5
}

export class UpdateUserDto {
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @IsOptional()
  name?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsNumber()
  @Min(150)
  @IsOptional()
  height?: number

  @IsNumber()
  @Min(35)
  @IsOptional()
  currentWeight?: number

  @IsNumber()
  @Min(35)
  @IsOptional()
  desiredWeight?: number

  @IsDateString()
  @IsOptional()
  @Validate(Is16YearsOld)
  birthday?: string

  @IsNumber()
  @IsIn(blood)
  @IsOptional()
  blood?: 1 | 2 | 3 | 4

  @IsString()
  @IsIn(sex)
  @IsOptional()
  sex?: 'male' | 'female'

  @IsNumber()
  @IsIn(activityLevel)
  @IsOptional()
  activityLevel?: 1 | 2 | 3 | 4 | 5
}
