export const FilterBadRequestResponseExample = {
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

export const FilterResponseExample = {
  content: {
    'application/json': {
      example: {
        page: 1,
        perPage: 10,
        totalPages: 2,
        filters: [
          {
            id: '650f35ece3f5522fc63962af',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/abductors_ymfukx.jpg',
            name: 'abductors'
          },
          {
            id: '650f35ece3f5522fc63962b0',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/abs_bdi0dw.jpg',
            name: 'abs'
          },
          {
            id: '650f35ece3f5522fc63962b1',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/adductors_fmkryf.jpg',
            name: 'adductors'
          },
          {
            id: '650f35ece3f5522fc63962b2',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/biceps_rnrxog.jpg',
            name: 'biceps'
          },
          {
            id: '650f35ece3f5522fc63962b3',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/calves_vzdk8o.jpg',
            name: 'calves'
          },
          {
            id: '650f35ece3f5522fc63962b4',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/cardiovascular_system_ooip0r.jpg',
            name: 'cardiovascular system'
          },
          {
            id: '650f35ece3f5522fc63962b5',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/delts_ui5hy5.jpg',
            name: 'delts'
          },
          {
            id: '650f35ece3f5522fc63962b6',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/forearms_bw15z9.jpg',
            name: 'forearms'
          },
          {
            id: '650f35ece3f5522fc63962b7',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/glutes_dtcdzf.jpg',
            name: 'glutes'
          },
          {
            id: '650f35ece3f5522fc63962b8',
            filter: 'Muscles',
            imgUrl:
              'https://ftp.goit.study/img/power-pulse/filters/hamstrings_i5rz3w.jpg',
            name: 'hamstrings'
          }
        ]
      }
    }
  }
}
