import { Transform } from 'class-transformer'
import { IsArray, IsNumber, IsPositive, IsUrl, Max, Min } from 'class-validator'

export class RootConfig {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(65535)
  public readonly PORT!: number

  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsUrl({ host_whitelist: ['localhost'] }, { each: true })
  public readonly ALLOWED_ORIGINS!: string[]
}
