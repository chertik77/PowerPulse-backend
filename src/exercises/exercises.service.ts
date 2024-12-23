import { Injectable } from '@nestjs/common'

import { PrismaService } from 'prisma/prisma.service'

import { SearchExerciseDto, SearchExerciseTypeDto } from './dto'

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async getAllExercises({
    bodyPart,
    equipment,
    target,
    page,
    perPage
  }: SearchExerciseDto) {
    const {
      records: exercises,
      totalRecords: totalExercises,
      totalPages
    } = await this.prisma.exercise.findManyAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      where: { OR: [{ bodyPart }, { equipment }, { target }] }
    })

    return { page, perPage, totalExercises, totalPages, exercises }
  }

  async getAllExercisesFilters({ type, page, perPage }: SearchExerciseTypeDto) {
    const {
      records: exerciseFilters,
      totalRecords: totalExerciseFilters,
      totalPages
    } = await this.prisma.exerciseFilter.findManyAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      where: { type }
    })

    return { page, perPage, totalExerciseFilters, totalPages, exerciseFilters }
  }
}
