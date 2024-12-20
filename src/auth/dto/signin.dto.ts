import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, MinLength } from 'class-validator'

export class SigninDto {
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string

  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @ApiProperty({ example: 'qwerty' })
  password: string
}
