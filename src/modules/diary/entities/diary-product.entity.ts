import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { Product } from 'modules/products/entities/product.entity'

@ObjectType()
export class DiaryProduct extends Product {
  @Field(() => ID)
  id: string

  @Field()
  productId: string

  @Field()
  diaryId: string

  @Field(() => Boolean)
  isRecommended: boolean
}

@ObjectType()
export class AddProductResponse {
  @Field(() => ID)
  id: string

  @Field()
  productId: string

  @Field()
  diaryId: string

  @Field(() => Int)
  weight: number

  @Field(() => Int)
  calories: number
}
