import type { RecommendedByBlood } from 'common/constants'
import type { Blood, Prisma } from 'generated/prisma/client'

import { Injectable } from '@nestjs/common'

import { PrismaService } from 'modules/prisma/prisma.service'

import { SearchProductInput } from './inputs/search-product.input'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(
    input: SearchProductInput | undefined,
    userBlood: Blood
  ) {
    const page = input?.page ?? 1
    const perPage = input?.perPage ?? 9
    const category = input?.category
    const title = input?.title

    const {
      records: products,
      totalRecords: total,
      totalPages
    } = await this.prisma.product.findManyAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      where: {
        category,
        title: { contains: title, mode: 'insensitive' },
        groupBloodNotAllowed: this.determineBloodFilter(
          input?.recommendedByBlood ?? 'All',
          userBlood
        )
      }
    })

    return { page, perPage, total, totalPages, items: products }
  }

  private determineBloodFilter(
    recommendedByBlood: RecommendedByBlood,
    userBLood: Blood
  ): Prisma.JsonFilter {
    if (recommendedByBlood === 'All') return {}

    if (recommendedByBlood === 'Recommended') {
      return { path: [userBLood], equals: true }
    }

    if (recommendedByBlood === 'Not Recommended') {
      return { path: [userBLood], equals: false }
    }

    return {}
  }
}
