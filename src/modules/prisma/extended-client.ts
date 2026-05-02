import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'generated/prisma/client'

import {
  deleteIgnoreNotFoundExtension,
  findManyAndCountExtension,
  updateIgnoreNotFoundExtension
} from './extensions'

const extendClient = (base: PrismaClient) =>
  base
    .$extends(findManyAndCountExtension)
    .$extends(updateIgnoreNotFoundExtension)
    .$extends(deleteIgnoreNotFoundExtension)

class UntypedExtendedClient extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

    super({ adapter, omit: { user: { password: true } } })

    return extendClient(this) as this
  }
}

export const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>
