import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthModule } from 'modules/auth/auth.module'
import { PrismaModule } from 'modules/prisma/prisma.module'
import { UserModule } from 'modules/user/user.module'

import { getGraphQLConfig, validate } from 'config'

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    GraphQLModule.forRoot(getGraphQLConfig()),
    PrismaModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
