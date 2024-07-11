import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from 'user/user.module'

import { Product, ProductSchema } from 'schemas'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
