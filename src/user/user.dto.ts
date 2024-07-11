import { IsDateString, IsIn, IsNumber, IsString, Min } from 'class-validator'

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
