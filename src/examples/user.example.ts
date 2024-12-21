export const UserMeResponseExample = {
  content: {
    'application/json': {
      example: {
        id: '6765fd94762c5c11fd53999b',
        name: 'Tom',
        email: 'test@gmail.com',
        height: null,
        currentWeight: null,
        desiredWeight: null,
        birthday: null,
        sex: null,
        blood: null,
        activityLevel: null,
        dailyCalorieIntake: null,
        dailyExerciseTime: 110,
        avatar: null
      }
    }
  }
}

export const UserDailyIntakeBadRequestResponseExample = {
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
        statusCode: 400
      }
    }
  }
}

export const UserDailyIntakeResponseExample = {
  content: {
    'application/json': {
      example: {
        dailyIntake: 2817,
        dailyExerciseTime: 110
      }
    }
  }
}
