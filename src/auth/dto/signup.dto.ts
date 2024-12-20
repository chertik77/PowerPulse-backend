import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, MinLength } from 'class-validator'

export class SignupDto {
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @ApiProperty({ example: 'Tom' })
  name: string

  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string

  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @ApiProperty({ example: 'qwerty' })
  password: string
}
