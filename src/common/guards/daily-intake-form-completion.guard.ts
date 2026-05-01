import type { ExecutionContext } from '@nestjs/common'

import { CanActivate, ForbiddenException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export class DailyIntakeFormCompletionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req

    const user = request.user

    if (user && user.isDailyIntakeFormCompleted) return true

    throw new ForbiddenException('Daily intake form is not completed')
  }
}
