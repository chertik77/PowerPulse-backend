import { HttpStatus } from '@nestjs/common'

export * from './auth.example'
export * from './product.example'
export * from './user.example'

export const UserNotFoundResponseExample = {
  content: {
    'application/json': {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND
      }
    }
  }
}

export const UnauthorizedResponseExample = {
  content: {
    'application/json': {
      example: {
        message: 'Unauthorized',
        error: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED
      }
    }
  }
}

export const FormNotCompletedResponseExample = {
  content: {
    'application/json': {
      example: {
        message: 'Daily intake form is not completed',
        error: 'Forbidden',
        statusCode: HttpStatus.FORBIDDEN
      }
    }
  }
}
