import { PrismaClient } from '@prisma/client'

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
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options)

    return extendClient(this) as this
  }
}

export const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>
