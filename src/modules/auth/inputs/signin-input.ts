import { Field, InputType } from '@nestjs/graphql'

import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class SigninInput {
  @IsEmail()
  @Field()
  email: string

  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @Field()
  password: string
}
