import { Field, InputType } from '@nestjs/graphql'

import { IsString } from 'class-validator'

@InputType()
export class RemoveProductInput {
  @IsString()
  @Field()
  productId: string

  @IsString()
  @Field()
  diaryId: string
}
