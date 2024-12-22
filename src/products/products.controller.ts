import type { Blood } from '@prisma/client'

import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import * as Examples from 'examples'

import { CurrentUser } from 'decorators'
import { Auth, FormCompletion } from 'guards'

import { SearchProductDto } from './dto'
import { ProductsService } from './products.service'

@Controller('products')
@FormCompletion()
@Auth()
@ApiTags('Products')
@ApiBearerAuth()
@ApiForbiddenResponse(Examples.FormNotCompletedResponseExample)
@ApiUnauthorizedResponse(Examples.UnauthorizedResponseExample)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse(Examples.ProductResponseExample)
  @ApiBadRequestResponse(Examples.ProductBadRequestResponseExample)
  async getAllProducts(
    @Query() query: SearchProductDto,
    @CurrentUser('blood') userBLood: Blood
  ) {
    return await this.productsService.getAllProducts(query, userBLood)
  }
}
