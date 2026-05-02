import { Injectable } from '@nestjs/common'

import { PrismaService } from 'modules/prisma/prisma.service'

import { SearchExercisesByBodyPartInput } from './inputs/search-exercises-by-body-part.input'
import { SearchExerciseFiltersByTypeInput } from './inputs/search-exercises-by-type.input'

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async getExercisesByBodyPart({
    bodyPart,
    page,
    perPage
  }: SearchExercisesByBodyPartInput) {
    const { records, totalRecords, totalPages } =
      await this.prisma.exercise.findManyAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        where: { bodyPart }
      })

    return { page, perPage, totalRecords, totalPages, records }
  }

  async getExerciseFiltersByType({
    type,
    page,
    perPage
  }: SearchExerciseFiltersByTypeInput) {
    const { records, totalRecords, totalPages } =
      await this.prisma.exerciseFilter.findManyAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        where: { type }
      })

    return { page, perPage, totalRecords, totalPages, records }
  }
}
