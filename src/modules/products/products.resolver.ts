import type { Blood } from 'generated/prisma/enums'

import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from 'common/decorators'
import { DailyIntakeFormCompletionGuard, JwtAuthGuard } from 'common/guards'

import { ProductsResponse } from './entities/product.entity'
import { SearchProductInput } from './inputs/search-product.input'
import { ProductsService } from './products.service'

@UseGuards(JwtAuthGuard, DailyIntakeFormCompletionGuard)
@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductsResponse)
  async products(
    @CurrentUser('blood') userBlood: Blood,
    @Args('search', { nullable: true }) search?: SearchProductInput
  ) {
    return await this.productsService.getAllProducts(search, userBlood)
  }
}
