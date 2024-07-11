import type { ExecutionContext } from '@nestjs/common'
import type { UserDocument } from 'schemas'

import { createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (id: keyof Pick<UserDocument, 'id'>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    const user = request.user

    return id ? user.id : user
  }
)
