import type { ExecutionContext } from '@nestjs/common'

import { CanActivate, ForbiddenException, UseGuards } from '@nestjs/common'

export class FormCompletionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const user = request.user

    if (user && user.isDailyIntakeFormCompleted) return true

    throw new ForbiddenException('Daily intake form is not completed')
  }
}

export const FormCompletion = () => UseGuards(FormCompletionGuard)
