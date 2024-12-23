import { PrismaClient } from '@prisma/client'

import {
  deleteIgnoreNotFoundExtension,
  updateIgnoreNotFoundExtension
} from './extensions'

function extendClient(base: PrismaClient) {
  return base
    .$extends(updateIgnoreNotFoundExtension)
    .$extends(deleteIgnoreNotFoundExtension)
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options)

    return extendClient(this) as this
  }
}

export const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>
