import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from 'modules/user/user.module'

import { getJwtConfig } from 'config'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule {}
