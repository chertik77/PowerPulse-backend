import type { Blood, Prisma } from '@prisma/client'

import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { RecommendedByBlood } from 'constants/recommended-by-blood'

import { SearchProductDto } from './dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(
    { page, limit, category, title, recommendedByBlood }: SearchProductDto,
    userBlood: Blood
  ) {
    const query: Prisma.ProductFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      where: {
        category,
        title: { contains: title, mode: 'insensitive' },
        groupBloodNotAllowed: this.determineBloodFilter(
          recommendedByBlood,
          userBlood
        )
      }
    }

    const [products, totalProducts] = await this.prisma.$transaction([
      this.prisma.product.findMany(query),
      this.prisma.product.count({ where: query.where })
    ])

    const totalPages = Math.ceil(totalProducts / limit)

    return { page, perPage: limit, totalPages, products }
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
