import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from 'modules/auth/auth.module'
import { ExercisesModule } from 'modules/exercises/exercises.module'
import { PrismaModule } from 'modules/prisma/prisma.module'
import { ProductsModule } from 'modules/products/products.module'
import { UserModule } from 'modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProductsModule,
    ExercisesModule
  ]
})
export class AppModule {}
