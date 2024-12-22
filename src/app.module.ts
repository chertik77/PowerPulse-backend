import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { FiltersModule } from './filters/filters.module'
import { PrismaModule } from './prisma/prisma.module'
import { ProductsModule } from './products/products.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProductsModule,
    FiltersModule
  ]
})
export class AppModule {}
