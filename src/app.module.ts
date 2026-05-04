import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

import { AuthModule } from 'modules/auth/auth.module'
import { DiaryModule } from 'modules/diary/diary.module'
import { ExercisesModule } from 'modules/exercises/exercises.module'
import { PrismaModule } from 'modules/prisma/prisma.module'
import { ProductsModule } from 'modules/products/products.module'
import { StatisticsModule } from 'modules/statistics/statistics.module'
import { UserModule } from 'modules/user/user.module'

import { AllExceptionsFilter } from 'common/filters'
import { getGraphQLConfig, validate } from 'config'

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    GraphQLModule.forRoot(getGraphQLConfig()),
    PrismaModule,
    AuthModule,
    UserModule,
    ProductsModule,
    ExercisesModule,
    DiaryModule,
    StatisticsModule
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }]
})
export class AppModule {}
