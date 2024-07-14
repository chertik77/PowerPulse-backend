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

  async getAllProducts(dto: SearchProductDto, userId: string) {
    const query = await this.getProductsByQuery(dto, userId)

    return query
  }

  private async getProductsByQuery(
    { title, category, recommendedByBlood }: SearchProductDto,
    userId: string
  ) {
    const user = await this.userService.findById(userId)

    const query = this.productModel.find()

    if (title) query.where('title').equals(new RegExp(title, 'i'))

    if (category) query.where('category').equals(category)

    if (recommendedByBlood === 'All') return query

    if (recommendedByBlood) {
      query
        .where(`groupBloodNotAllowed.${user?.blood.toString()}`)
        .equals(recommendedByBlood === 'Recommended' ? true : false)
    }

    return query
  }
}
