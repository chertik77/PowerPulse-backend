import { HttpStatus } from '@nestjs/common'

export const ProductBadRequestResponseExample = {
  content: {
    'application/json': {
      example: {
        message: [
          'recommendedByBlood must be one of the following values: All, Recommended, Not recommended',
          'page must be a number conforming to the specified constraints'
        ],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
  }
}

export const ProductResponseExample = {
  content: {
    'application/json': {
      example: [
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff552c',
          weight: 100,
          calories: 157,
          category: 'eggs',
          title: 'Melange egg'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff552d',
          weight: 100,
          calories: 184,
          category: 'eggs',
          title: 'Omelette'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff552e',
          weight: 100,
          calories: 257,
          category: 'eggs',
          title: 'Whipped cream omelette'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff552f',
          weight: 100,
          calories: 200,
          category: 'eggs',
          title: 'Egg powder omelette'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff5530',
          weight: 100,
          calories: 342,
          category: 'eggs',
          title: 'Omelet with cheese'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff5531',
          weight: 100,
          calories: 215,
          category: 'eggs',
          title: 'Fried egg'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff5532',
          weight: 100,
          calories: 542,
          category: 'eggs',
          title: 'Egg powder'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff5533',
          weight: 100,
          calories: 185,
          category: 'eggs',
          title: 'goose egg'
        },
        {
          groupBloodNotAllowed: {
            A: true,
            B: false,
            AB: false,
            O: false
          },
          id: '5d51694802b2373622ff5534',
          weight: 100,
          calories: 165,
          category: 'eggs',
          title: 'turkey egg'
        }
      ]
    }
  }
}
