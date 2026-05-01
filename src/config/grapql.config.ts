import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { ValidationError } from 'class-validator'
import type { Request, Response } from 'express'

import { ApolloDriver } from '@nestjs/apollo'

export const getGraphQLConfig = (): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: true,
  graphiql: true,
  context: ({ req, res }: { req: Request; res: Response }) => ({
    req,
    res
  }),
  formatError: error => {
    const originalError = error.extensions?.originalError as ValidationError

    if (originalError) return { message: error.message, originalError }

    return error
  }
})
