import { HttpStatus } from '@nestjs/common'

export const AuthResponseExample = {
  headers: {
    'Set-Cookie': { description: 'Refresh token', schema: { type: 'string' } }
  },
  content: {
    'application/json': {
      example: {
        user: {
          id: '67682dd4498bc0d0f81dba97',
          name: 'Tom',
          email: 'test@gmail.com',
          height: null,
          currentWeight: null,
          desiredWeight: null,
          birthday: null,
          sex: null,
          blood: null,
          isDailyIntakeFormCompleted: false,
          activityLevel: null,
          dailyCalorieIntake: null,
          dailyExerciseTime: 110,
          avatar: null
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjgyZGQ0NDk4YmMwZDBmODFkYmE5NyIsImlhdCI6MTczNDg4MDcyNCwiZXhwIjoxNzM0ODg0MzI0fQ.6NJ6wvkHgm2KPUgbMOaSqCM4nDD1COfyxwtWdq9Smto'
      }
    }
  }
}

export const TokensResponseExample = {
  headers: {
    'Set-Cookie': { description: 'Refresh token', schema: { type: 'string' } }
  },
  content: {
    'application/json': {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTc5OTFlOWNiMDQ4MWM0NmUzNjE0NiIsImlhdCI6MTcwOTY3NjgzMCwiZXhwIjoxNzA5NjgwNDMwfQ.jCQulMoUbRdq1DLJz4wRSAh1kGGRiJ1ARHs2cnHzfxk'
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
        statusCode: HttpStatus.CONFLICT
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
        statusCode: HttpStatus.BAD_REQUEST
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
