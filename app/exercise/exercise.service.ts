import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllExercises() {
    const exercises = await this.prisma.exercise.findMany()

    return exercises
  }
}
