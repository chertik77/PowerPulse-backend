import { Catch, HttpException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'

import { GraphQLError } from 'graphql'

@Catch(HttpException)
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus()

    let code = 'INTERNAL_ERROR'

    switch (status) {
      case 401:
        code = 'UNAUTHENTICATED'
        break
      case 403:
        code = 'FORBIDDEN'
        break
      case 404:
        code = 'NOT_FOUND'
        break
      case 409:
        code = 'CONFLICT'
        break
      case 400:
        code = 'BAD_REQUEST'
        break
    }

    return new GraphQLError(exception.message, {
      extensions: { code, statusCode: status }
    })
  }
}
