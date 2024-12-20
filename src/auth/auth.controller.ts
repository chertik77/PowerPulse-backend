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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import * as Examples from 'examples'

import { AuthService } from './auth.service'
import { SigninDto, SignupDto } from './dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse(Examples.AuthResponseExample)
  @ApiBadRequestResponse(Examples.SignupBadRequestResponseExample)
  @ApiConflictResponse(Examples.ConflictResponseExample)
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
  @ApiOperation({ summary: 'Signin a user' })
  @ApiOkResponse(Examples.AuthResponseExample)
  @ApiNotFoundResponse(Examples.UserNotFoundResponseExample)
  @ApiBadRequestResponse(Examples.SigninBadRequestResponseExample)
  @ApiUnauthorizedResponse(Examples.UnauthorizedResponseExample)
  async signin(
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get fresh and new tokens' })
  @ApiUnauthorizedResponse(Examples.UnauthorizedResponseExample)
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Signout a user' })
  @ApiNoContentResponse()
  async signout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }
}
