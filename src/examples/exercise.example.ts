export const ExercisesFiltersBadRequestResponseExample = {
  content: {
    'application/json': {
      example: {
        message: [
          'filter must be one of the following values: Body parts, Muscles, Equipment'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
    }
  }
}

export const ExercisesBadRequestResponseExample = {
  content: {
    'application/json': {
      example: {
        message: [
          'Only one of bodyPart, equipment, target can be defined at time.'
        ],
        error: 'Bad Request',
        statusCode: 400
      }
    }
  }
}

export const ExercisesFiltersResponseExample = {
  content: {
    'application/json': {
      example: {
        page: 1,
        perPage: 10,
        totalPages: 2,
        filters: [
          {
            id: '650f35ece3f5522fc63962af',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/abductors_ymfukx.jpg',
            name: 'abductors'
          },
          {
            id: '650f35ece3f5522fc63962b0',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/abs_bdi0dw.jpg',
            name: 'abs'
          },
          {
            id: '650f35ece3f5522fc63962b1',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/adductors_fmkryf.jpg',
            name: 'adductors'
          },
          {
            id: '650f35ece3f5522fc63962b2',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/biceps_rnrxog.jpg',
            name: 'biceps'
          },
          {
            id: '650f35ece3f5522fc63962b3',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/calves_vzdk8o.jpg',
            name: 'calves'
          },
          {
            id: '650f35ece3f5522fc63962b4',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/cardiovascular_system_ooip0r.jpg',
            name: 'cardiovascular system'
          },
          {
            id: '650f35ece3f5522fc63962b5',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/delts_ui5hy5.jpg',
            name: 'delts'
          },
          {
            id: '650f35ece3f5522fc63962b6',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/forearms_bw15z9.jpg',
            name: 'forearms'
          },
          {
            id: '650f35ece3f5522fc63962b7',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/glutes_dtcdzf.jpg',
            name: 'glutes'
          },
          {
            id: '650f35ece3f5522fc63962b8',
            type: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/hamstrings_i5rz3w.jpg',
            name: 'hamstrings'
          }
        ]
      }
    }
  }
}

export const ExercisesResponseExample = {
  content: {
    'application/json': {
      example: {
        page: 1,
        perPage: 9,
        totalPages: 19,
        exercises: [
          {
            id: '64f2458d6f67bc34bae4f7f7',
            bodyPart: 'chest',
            burnedCalories: 329,
            equipment: 'leverage machine',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0009.gif',
            name: 'assisted chest dip (kneeling)',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f806',
            bodyPart: 'chest',
            burnedCalories: 250,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0025.gif',
            name: 'barbell bench press',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f80e',
            bodyPart: 'chest',
            burnedCalories: 129,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0033.gif',
            name: 'barbell decline bench press',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f811',
            bodyPart: 'chest',
            burnedCalories: 209,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0036.gif',
            name: 'barbell decline wide-grip press',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f815',
            bodyPart: 'chest',
            burnedCalories: 142,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0040.gif',
            name: 'barbell front raise and pullover',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f81a',
            bodyPart: 'chest',
            burnedCalories: 183,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0045.gif',
            name: 'barbell guillotine bench press',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f81c',
            bodyPart: 'chest',
            burnedCalories: 165,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0047.gif',
            name: 'barbell incline bench press',
            target: 'pectorals',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f81f',
            bodyPart: 'chest',
            burnedCalories: 244,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0050.gif',
            name: 'barbell incline shoulder raise',
            target: 'serratus anterior',
            time: 3
          },
          {
            id: '64f2458d6f67bc34bae4f865',
            bodyPart: 'chest',
            burnedCalories: 253,
            equipment: 'barbell',
            gifUrl: 'https://ftp.goit.study/img/power-pulse/gifs/0122.gif',
            name: 'barbell wide bench press',
            target: 'pectorals',
            time: 3
          }
        ]
      }
    }
  }
}
