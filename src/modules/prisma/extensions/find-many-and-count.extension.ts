/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma } from '@prisma/client'

type FindManyAndCountResult<T> = {
  records: T
  totalRecords: number
  totalPages: number
}

export const findManyAndCountExtension = Prisma.defineExtension(client => {
  return client.$extends({
    name: 'findManyAndCount',
    model: {
      $allModels: {
        async findManyAndCount<T, A>(
          this: T,
          args?: Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
        ): Promise<FindManyAndCountResult<Prisma.Result<T, A, 'findMany'>>> {
          const context = Prisma.getExtensionContext(this) as any

          const [records, totalRecords] = await client.$transaction([
            context.findMany(args),
            context.count({ where: (args as any)?.where })
          ])

          const take = (args as any)?.take
          let totalPages = totalRecords === 0 ? 0 : 1

          if (take === 0) {
            totalPages = 0
          } else if (typeof take === 'number') {
            totalPages = Math.ceil(totalRecords / take)
          }

          return { records, totalRecords, totalPages }
        }
      }
    }
  })
})
