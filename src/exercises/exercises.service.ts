import { Injectable } from '@nestjs/common'

import { Prisma } from '@prisma/client'
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
    const query: Prisma.ExerciseFindManyArgs = {
      skip: (page - 1) * perPage,
      take: perPage,
      where: { OR: [{ bodyPart }, { equipment }, { target }] }
    }

    const [exercises, totalExercises] = await this.prisma.$transaction([
      this.prisma.exercise.findMany(query),
      this.prisma.exercise.count({ where: query.where })
    ])

    const totalPages = Math.ceil(totalExercises / perPage)

    return { page, perPage, totalPages, exercises }
  }

  async getAllExercisesFilters({ type, page, perPage }: SearchExerciseTypeDto) {
    const query: Prisma.ExerciseFilterFindManyArgs = {
      skip: (page - 1) * perPage,
      take: perPage,
      where: { type }
    }

    const [exerciseFilters, totalExerciseFilters] =
      await this.prisma.$transaction([
        this.prisma.exerciseFilter.findMany(query),
        this.prisma.exerciseFilter.count({ where: query.where })
      ])

    const totalPages = Math.ceil(totalExerciseFilters / perPage)

    return { page, perPage, totalPages, exerciseFilters }
  }
}
