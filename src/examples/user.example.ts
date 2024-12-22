import { HttpStatus } from '@nestjs/common'

export const UserMeResponseExample = {
  content: {
    'application/json': {
      example: {
        id: '67682dd4498bc0d0f81dba97',
        name: 'Jake',
        email: 'test@gmail.com',
        height: 170,
        currentWeight: 83,
        desiredWeight: 80,
        birthday: '2008-10-21T00:00:00.000Z',
        sex: 'male',
        blood: 'B',
        isDailyIntakeFormCompleted: true,
        activityLevel: 3,
        dailyCalorieIntake: 2817,
        dailyExerciseTime: 110,
        avatar: null
      }
    }
  }
}

export const UpdatedUserResponseExample = {
  content: {
    'application/json': {
      example: {
        id: '67682dd4498bc0d0f81dba97',
        name: 'Jake',
        email: 'test@gmail.com',
        height: 180,
        currentWeight: 75,
        desiredWeight: 73,
        birthday: '2008-10-21T00:00:00.000Z',
        sex: 'male',
        blood: 'B',
        isDailyIntakeFormCompleted: true,
        activityLevel: 3,
        dailyCalorieIntake: 2817,
        dailyExerciseTime: 110,
        avatar: 'http://res.cloudinary.com/dtsgte7py/....u7.jpg'
      }
    }
  }
}

export const UserBadRequestResponseExample = {
  content: {
    'application/json': {
      example: {
        message: [
          'Height should be at least 150 cm',
          'Desired weight should be at least 35 kg',
          'sex must be one of the following values: male, female',
          'activityLevel must be one of the following values: 1, 2, 3, 4, 5'
        ],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
  }
}

export const UserDailyIntakeResponseExample = {
  content: {
    'application/json': {
      example: {
        dailyCalorieIntake: 2817,
        dailyExerciseTime: 110
      }
    }
  }
}

export const UserUnprocessableEntityResponseExample = {
  content: {
    'application/json': {
      example: {
        message: 'Validation failed (expected type is /(jpeg|png)/)',
        error: 'Unprocessable Entity',
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }
    }
  }
}
