import { Field, InputType } from '@nestjs/graphql'

import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class SignupInput {
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string

  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @Field()
  password: string
}
