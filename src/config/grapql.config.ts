import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { Request, Response } from 'express'

import { ApolloDriver } from '@nestjs/apollo'

import GraphQLJSON from 'graphql-type-json'

export const getGraphQLConfig = (): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: true,
  graphiql: true,
  introspection: process.env.NODE_ENV === 'development',
  resolvers: { JSON: GraphQLJSON },
  context: ({ req, res }: { req: Request; res: Response }) => ({
    req,
    res
  })
})
