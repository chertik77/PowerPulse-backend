import type { Blood } from '@prisma/client'

import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { RecommendedByBlood } from 'constants/recommended-by-blood'

import { SearchProductDto } from './dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(query: SearchProductDto, userBlood: Blood) {
    const products = await this.prisma.product.findMany({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      where: {
        category: query.category,
        title: { contains: query.title, mode: 'insensitive' },
        groupBloodNotAllowed: this.determineBloodFilter(
          query.recommendedByBlood,
          userBlood
        )
      }
    })

    return products
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
