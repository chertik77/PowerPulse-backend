import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from 'modules/user/user.module'

import { getJwtConfig } from 'config'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
