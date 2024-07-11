import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'

import { UserService } from 'user/user.service'

import { Product } from 'schemas'

import { SearchProductDto } from './product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly userService: UserService
  ) {}

  getAllProducts(
    { title, category, recommendedByBloodType }: SearchProductDto,
    userId: string
  ) {
    const {} = this.userService.findById(userId)
    const query = this.productModel.find()

    if (title) query.where('title').equals(new RegExp(title, 'i'))

    if (category) query.where('category').equals(category)

    if (recommendedByBloodType) {
      query.where('groupBloodNotAllowed[2]').equals(false)
    }

    return query
  }
}
