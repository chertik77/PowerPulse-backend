import type { Response } from 'express'

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { verify } from 'argon2'
import { TypedConfigService } from 'typed-config-service'

import { UserService } from 'user/user.service'

import { SigninDto, SignupDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly jwt: JwtService,
    private readonly userService: UserService
  ) {}

  REFRESH_TOKEN_EXPIRE_DAY = 1
  REFRESH_TOKEN_NAME = 'refreshToken'

  async signup(dto: SignupDto) {
    const isUserExists = await this.userService.findOneByEmail(dto.email)

    if (isUserExists) throw new ConflictException('User with this email exists')

    const user = await this.userService.createNewUser(dto)

    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  async signin(dto: SigninDto) {
    const user = await this.validateUser(dto)

    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.userService.findById(result.id)

    const tokens = this.issueTokens(user?.id as string)

    return tokens
  }

  private issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN')
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN')
    })

    return { accessToken, refreshToken }
  }

  private async validateUser({ email, password }: SigninDto) {
    const user = await this.userService.findOneByEmail(email)

    if (!user) throw new NotFoundException('User not found')

    const { password: userPassword, ...userWithoutPassword } = user

    const isValidPassword = await verify(userPassword, password)

    if (!isValidPassword) throw new UnauthorizedException('Invalid password')

    return userWithoutPassword
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_EXPIRE_DAY)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: this.configService.get('COOKIE_HTTP_ONLY'),
      secure: this.configService.get('COOKIE_SECURE'),
      expires: expiresIn,
      domain: this.configService.get('COOKIE_DOMAIN'),
      sameSite: this.configService.get('COOKIE_SAME_SITE')
    })
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: this.configService.get('COOKIE_HTTP_ONLY'),
      secure: this.configService.get('COOKIE_SECURE'),
      expires: new Date(0),
      domain: this.configService.get('COOKIE_DOMAIN'),
      sameSite: this.configService.get('COOKIE_SAME_SITE')
    })
  }
}
