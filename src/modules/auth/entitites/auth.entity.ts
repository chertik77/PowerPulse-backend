import { Field, ObjectType } from '@nestjs/graphql'

import { User } from 'modules/user/entitites/user.entity'

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User
}
