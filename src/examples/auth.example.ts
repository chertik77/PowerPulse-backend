export const AuthResponseExample = {
  headers: {
    'Set-Cookie': { description: 'Refresh token', schema: { type: 'string' } }
  },
  content: {
    'application/json': {
      example: {
        user: {
          id: '6765fd94762c5c11fd53999b',
          name: 'Tom',
          email: 'test@mail.com',
          height: null,
          currentWeight: null,
          desiredWeight: null,
          birthday: null,
          sex: null,
          activityLevel: null,
          dailyCalorieIntake: null,
          dailyExerciseTime: 110,
          avatar: null,
          avatarPublicId: null
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjVmZDk0NzYyYzVjMTFmZDUzOTk5YiIsImlhdCI6MTczNDczNzMwMCwiZXhwIjoxNzM0NzQwOTAwfQ.8yGePnlUNY6TxcBGL7VcIe5B1QvxNFoM2b63K8ZjrjA'
      }
    }
  }
}

export const ConflictResponseExample = {
  content: {
    'application/json': {
      example: {
        message: 'User with this email exists',
        error: 'Conflict',
        statusCode: 409
      }
    }
  }
}

export const SignupBadRequestResponseExample = {
  content: {
    'application/json': {
      example: {
        message: [
          'Name should be at least 2 characters long',
          'Password should be at least 6 characters long'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
    }
  }
}

export const SigninBadRequestResponseExample = {
  content: {
    'application/json': {
      example: {
        message: [
          'email must be an email',
          'Password should be at least 6 characters long'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
    }
  }
}
