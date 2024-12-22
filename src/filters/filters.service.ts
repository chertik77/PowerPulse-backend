import { Injectable } from '@nestjs/common'

import { Prisma } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'

import { SearchFilterDto } from './dto'

@Injectable()
export class FiltersService {
  constructor(private prisma: PrismaService) {}

  async getAllFilters({ filter, page, limit }: SearchFilterDto) {
    const query: Prisma.FilterFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      where: { filter }
    }

    const [filters, totalFilters] = await this.prisma.$transaction([
      this.prisma.filter.findMany(query),
      this.prisma.filter.count({ where: query.where })
    ])

    const totalPages = Math.ceil(totalFilters / limit)

    return { page, perPage: limit, totalPages, filters }
  }
}
