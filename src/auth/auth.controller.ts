import type { Request, Response } from 'express'

import * as NestjsCommon from '@nestjs/common'

import { SigninDto, SignupDto } from './auth.dto'
import { AuthService } from './auth.service'

@NestjsCommon.Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NestjsCommon.UsePipes(new NestjsCommon.ValidationPipe())
  @NestjsCommon.Post('signup')
  async signup(
    @NestjsCommon.Body()
    dto: SignupDto,
    @NestjsCommon.Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.signup(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @NestjsCommon.UsePipes(new NestjsCommon.ValidationPipe())
  @NestjsCommon.Post('signin')
  @NestjsCommon.HttpCode(200)
  async login(
    @NestjsCommon.Body()
    dto: SigninDto,
    @NestjsCommon.Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.signin(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @NestjsCommon.Post('tokens')
  async getNewTokens(
    @NestjsCommon.Req() req: Request,
    @NestjsCommon.Res({ passthrough: true }) res: Response
  ) {
    const refreshTokenFromCookies =
      req?.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new NestjsCommon.UnauthorizedException('Refresh token not passed')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @NestjsCommon.Post('signout')
  @NestjsCommon.HttpCode(204)
  async signout(@NestjsCommon.Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }
}
