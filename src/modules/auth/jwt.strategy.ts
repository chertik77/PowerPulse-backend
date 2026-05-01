import type { EnvironmentVariables } from 'config'
import type { Request } from 'express'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserService } from 'modules/user/user.service'

const cookieExtractor = (req: Request): string | null =>
  req.cookies?.accessToken ?? null

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET')
    })
  }
  async validate({ id }: { id: string }) {
    return this.userService.findById(id)
  }
}
