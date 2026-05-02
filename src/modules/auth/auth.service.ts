import type { EnvironmentVariables } from 'config'
import type { CookieOptions, Response } from 'express'
import type { SigninInput } from './inputs/signin-input'
import type { SignupInput } from './inputs/signup-input'

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { verify } from 'argon2'

import { UserService } from 'modules/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwt: JwtService,
    private readonly userService: UserService
  ) {}

  readonly ACCESS_TOKEN_NAME = 'accessToken'
  readonly REFRESH_TOKEN_NAME = 'refreshToken'

  readonly COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: this.configService.get('NODE_ENV') === 'production',
    sameSite: 'lax'
  }

  async signup(input: SignupInput, res: Response) {
    const isUserExists = await this.userService.findOneByEmail(input.email)

    if (isUserExists) throw new ConflictException('User with this email exists')

    const user = await this.userService.createNewUser(input)

    await this.issueTokensAndSetCookies(res, user.id)

    return { user }
  }

  signin = async (input: SigninInput, res: Response) => {
    const user = await this.userService.findOneByEmail(input.email, {
      omit: { password: false }
    })

    if (!user) throw new UnauthorizedException('Email or password invalid')

    const { password, ...userWithoutPassword } = user

    if (!password) throw new UnauthorizedException('Email or password invalid')

    const isPasswordMatch = await verify(password, input.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email or password invalid')
    }

    await this.issueTokensAndSetCookies(res, user.id)

    return { user: userWithoutPassword }
  }

  refresh = async (refreshToken: string | undefined, res: Response) => {
    if (!refreshToken) throw new ForbiddenException()

    const result = await this.jwt.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException()

    const user = await this.userService.findById(result.id)

    if (!user) throw new UnauthorizedException()

    await this.issueTokensAndSetCookies(res, user.id)
  }

  logout = async (res: Response) => {
    res.clearCookie(this.ACCESS_TOKEN_NAME, this.COOKIE_OPTIONS)
    res.clearCookie(this.REFRESH_TOKEN_NAME, this.COOKIE_OPTIONS)

    return true
  }

  private async issueTokensAndSetCookies(res: Response, userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN')
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN')
    })

    res.cookie(this.ACCESS_TOKEN_NAME, accessToken, {
      ...this.COOKIE_OPTIONS,
      maxAge: 1000 * 60 * 60 // 1 hour
    })

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      ...this.COOKIE_OPTIONS,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    })

    return { accessToken, refreshToken }
  }
}
