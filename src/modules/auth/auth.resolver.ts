import type { Request, Response } from 'express'

import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import { JwtAuthGuard } from 'common/guards'

import { AuthService } from './auth.service'
import { SigninInput } from './inputs/signin-input'
import { SignupInput } from './inputs/signup-input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async signup(
    @Args('input') input: SignupInput,
    @Context() { res }: { res: Response }
  ) {
    return await this.authService.signup(input, res)
  }

  @Mutation(() => Boolean)
  async signin(
    @Args('input') input: SigninInput,
    @Context() { res }: { res: Response }
  ) {
    return await this.authService.signin(input, res)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async refreshTokens(
    @Context() { req, res }: { req: Request; res: Response }
  ) {
    const refreshTokenFromCookies =
      req?.cookies[this.authService.REFRESH_TOKEN_NAME]

    await this.authService.refresh(refreshTokenFromCookies, res)

    return true
  }

  @Mutation(() => Boolean)
  async logout(@Context() { res }: { res: Response }) {
    return await this.authService.logout(res)
  }
}
