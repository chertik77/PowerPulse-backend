import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  weight: number

  @Field(() => Int)
  calories: number

  @Field()
  title: string

  @Field()
  category: string

  @Field(() => GraphQLJSON)
  groupBloodNotAllowed: Record<string, boolean>
}

@ObjectType()
export class ProductsResponse {
  @Field(() => Int)
  totalPages: number

  @Field(() => Int)
  totalRecords: number

  @Field(() => Int)
  page: number

  @Field(() => [Product])
  records: Product[]
}
