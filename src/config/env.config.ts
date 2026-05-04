import type { StringValue } from 'ms'

import { plainToInstance, Transform } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  validateSync
} from 'class-validator'

export class EnvironmentVariables {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(65535)
  public readonly PORT: number

  @IsString()
  public readonly DATABASE_URL: string

  @IsString()
  public readonly JWT_SECRET: string

  @IsString()
  public readonly ACCESS_TOKEN_EXPIRES_IN: StringValue

  @IsString()
  public readonly REFRESH_TOKEN_EXPIRES_IN: StringValue

  @IsIn(['development', 'production'])
  @IsString()
  public readonly NODE_ENV: string = 'development'

  @Transform(({ value }) => value.split(','))
  @IsArray()
  public readonly ALLOWED_ORIGINS: string[]

  @IsString()
  public readonly CLOUDINARY_CLOUD_NAME: string

  @IsString()
  public readonly CLOUDINARY_API_KEY: string

  @IsString()
  public readonly CLOUDINARY_API_SECRET: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) throw new Error(errors.toString())

  return validatedConfig
}
