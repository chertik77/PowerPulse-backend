import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'

import { Auth, CurrentUser } from 'decorators'

import { SearchProductDto } from './product.dto'
import { ProductsService } from './products.service'

@Controller('products')
@Auth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(
    @CurrentUser('id') userId: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
        forbidUnknownValues: true
      })
    )
    query: SearchProductDto
  ) {
    return this.productsService.getAllProducts(query, userId)
  }
}
