import { IsEmail, MinLength } from 'class-validator'

export class SignupDto {
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  name: string

  @IsEmail()
  email: string

  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  password: string
}
