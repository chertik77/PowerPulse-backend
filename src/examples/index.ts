export * from './auth.example'
export * from './user.example'

export const UserNotFoundResponseExample = {
  content: {
    'application/json': {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404
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
        statusCode: 401
      }
    }
  }
}
