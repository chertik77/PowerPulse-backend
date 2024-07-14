import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SearchProductDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  category?: string

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsIn(['All', 'Recommended', 'Not recommended'])
  recommendedByBlood?: 'All' | 'Recommended' | 'Not recommended'
}
