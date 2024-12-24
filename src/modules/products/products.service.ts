import type { Blood } from '@prisma/client'

import { Injectable } from '@nestjs/common'

import { PrismaService } from 'modules/prisma/prisma.service'

import { RecommendedByBlood } from 'common/constants'

import { SearchProductDto } from './dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(
    { page, perPage, category, title, recommendedByBlood }: SearchProductDto,
    userBlood: Blood
  ) {
    const {
      records: products,
      totalRecords: totalProducts,
      totalPages
    } = await this.prisma.product.findManyAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      where: {
        category,
        title: { contains: title, mode: 'insensitive' },
        groupBloodNotAllowed: this.determineBloodFilter(
          recommendedByBlood,
          userBlood
        )
      }
    })

    return { page, perPage, totalProducts, totalPages, products }
  }

  private determineBloodFilter(
    recommendedByBlood: RecommendedByBlood,
    userBLood: Blood
  ) {
    if (recommendedByBlood === 'All') return

    if (recommendedByBlood === 'Recommended') {
      return { is: { [userBLood]: true } }
    }

    if (recommendedByBlood === 'Not recommended') {
      return { is: { [userBLood]: false } }
    }
  }
}
