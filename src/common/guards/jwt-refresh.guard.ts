import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

type JwtError = {
  name?: string
  message?: string
  expiredAt?: Date
}

export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: unknown, user: never, info: JwtError) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('jwt expired')
    }

    if (err || !user) throw new UnauthorizedException()

    return user
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
