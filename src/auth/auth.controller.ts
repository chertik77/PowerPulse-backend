import type { Request, Response } from 'express'

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SigninDto, SignupDto } from './dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async signup(
    @Body()
    dto: SignupDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.signup(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async login(
    @Body()
    dto: SigninDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { refreshToken, ...response } = await this.authService.signin(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @Post('tokens')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshTokenFromCookies =
      req?.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async signout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }
}
