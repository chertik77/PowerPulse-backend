import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength
} from 'class-validator'

export class CalculateDailyNormsDto {
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
  birthDate: string

  @IsNumber()
  @IsIn([1, 2, 3, 4])
  bloodType: 1 | 2 | 3 | 4

  @IsString()
  @IsIn(['male', 'female'])
  gender: 'male' | 'female'

  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
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
  birthDate?: string

  @IsNumber()
  @IsIn([1, 2, 3, 4])
  @IsOptional()
  bloodType?: 1 | 2 | 3 | 4

  @IsString()
  @IsIn(['male', 'female'])
  @IsOptional()
  gender?: 'male' | 'female'

  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  @IsOptional()
  activityLevel?: 1 | 2 | 3 | 4 | 5
}
