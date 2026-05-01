import type { ExecutionContext } from '@nestjs/common'

import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { User } from 'generated/prisma/client'

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx)

    const user = context.getContext().req.user

    return data ? user[data] : user
  }
)
