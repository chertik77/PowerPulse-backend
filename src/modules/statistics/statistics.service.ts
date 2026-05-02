import { Injectable } from '@nestjs/common'

import { PrismaService } from 'modules/prisma/prisma.service'

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics() {
    const totalExercises = await this.prisma.exercise.count()
    const totalUsers = await this.prisma.user.count()
    const totalWorkouts = await this.prisma.diaryExercise.count()
    const totalBurnedCalories = await this.getTotalBurnedCalories()
    const totalWorkoutTime = await this.getTotalWorkoutTime()

    return {
      totalExercises,
      totalWorkouts,
      totalUsers,
      totalBurnedCalories,
      totalWorkoutTime
    }
  }

  private async getTotalBurnedCalories() {
    const {
      _sum: { calories: total }
    } = await this.prisma.diaryProduct.aggregate({
      _sum: { calories: true }
    })

    return total ?? 0
  }

  private async getTotalWorkoutTime() {
    const {
      _sum: { duration }
    } = await this.prisma.diaryExercise.aggregate({
      _sum: { duration: true }
    })

    const totalHours = duration ? Math.floor(duration / 60) : 0

    return totalHours
  }
}
