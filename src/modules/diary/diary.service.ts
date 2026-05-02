import type { Blood, Prisma, User } from 'generated/prisma/client'
import type { AddProductInput } from './inputs/add-product.input'
import type { GetDiaryInput } from './inputs/get-diary.input'

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'

import { PrismaService } from 'modules/prisma/prisma.service'

import { AddExerciseInput } from './inputs/add-exercise.input'
import { RemoveExerciseInput } from './inputs/remove-exercise.input'
import { RemoveProductInput } from './inputs/remove-product.input'

type DiaryWithIncludes = Prisma.DiaryGetPayload<{
  include: {
    products: true
    exercises: true
  }
}>

@Injectable()
export class DiaryService {
  constructor(private prisma: PrismaService) {}

  async getDiary(user: User, { date }: GetDiaryInput) {
    // Reset time to 0 for diary date comparisons
    const normalizedDate = new Date(date)
    normalizedDate.setHours(0, 0, 0, 0)

    const diary = await this.prisma.diary.findUnique({
      where: { userId_date: { userId: user.id, date: normalizedDate } },
      include: {
        products: { include: { product: true } },
        exercises: { include: { exercise: true } }
      }
    })

    if (!diary) {
      return {
        date,
        products: [],
        exercises: [],
        caloriesConsumed: 0,
        caloriesBurned: 0,
        caloriesRemaining: user.dailyCalorieIntake ?? 0,
        exerciseTimeRemaining: user.dailyExerciseTime ?? 0
      }
    }

    const products = diary.products.map(dp => {
      const rules = dp.product.groupBloodNotAllowed as Record<
        Blood,
        boolean
      > | null

      return {
        ...dp.product,
        ...dp,
        isRecommended: rules?.[user.blood as Blood] ?? false
      }
    })

    const exercises = diary.exercises.map(dx => ({
      ...dx.exercise,
      ...dx
    }))

    return {
      ...diary,
      products,
      exercises,
      ...this.calculateUserStats(diary, user)
    }
  }

  async addProductToDiary(
    userId: string,
    { productId, date, weight, calories }: AddProductInput
  ) {
    const diary = await this.prisma.diary.upsert({
      where: { userId_date: { userId, date } },
      update: {},
      create: { userId, date }
    })

    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) throw new NotFoundException('Product not found')

    const diaryProduct = await this.prisma.diaryProduct.create({
      data: { diaryId: diary.id, productId: product.id, weight, calories }
    })

    return diaryProduct
  }

  async addExerciseToDiary(
    userId: string,
    { exerciseId, date, duration, burnedCalories }: AddExerciseInput
  ) {
    const diary = await this.prisma.diary.upsert({
      where: { userId_date: { userId, date } },
      update: {},
      create: { userId, date }
    })

    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId }
    })

    if (!exercise) throw new NotFoundException('Exercise not found')

    const diaryExercise = await this.prisma.diaryExercise.create({
      data: {
        diaryId: diary.id,
        exerciseId: exercise.id,
        duration,
        burnedCalories
      }
    })

    return diaryExercise
  }

  async removeProductFromDiary({ diaryId, productId }: RemoveProductInput) {
    const diary = await this.prisma.diary.findUnique({ where: { id: diaryId } })

    if (!diary) throw new NotFoundException('Diary not found')

    const product = await this.prisma.diaryProduct.findUnique({
      where: { id: productId }
    })

    if (!product) throw new NotFoundException('Product not found')

    await this.prisma.diaryProduct.delete({ where: { id: product.id } })

    return true
  }

  async removeExerciseFromDiary({ diaryId, exerciseId }: RemoveExerciseInput) {
    const diary = await this.prisma.diary.findUnique({ where: { id: diaryId } })

    if (!diary) throw new NotFoundException('Diary not found')

    const exercise = await this.prisma.diaryExercise.findUnique({
      where: { id: exerciseId }
    })

    if (!exercise) throw new NotFoundException('Exercise not found')

    await this.prisma.diaryExercise.delete({ where: { id: exercise.id } })

    return true
  }

  private calculateUserStats(diary: DiaryWithIncludes, user: User) {
    if (!user.dailyCalorieIntake || !user.dailyExerciseTime) {
      throw new BadRequestException('Daily intake and exercise time not set')
    }

    const caloriesConsumed = diary.products.reduce(
      (sum, p) => sum + p.calories,
      0
    )

    const caloriesBurned = diary.exercises.reduce(
      (sum, e) => sum + e.burnedCalories,
      0
    )

    const caloriesRemaining =
      user.dailyCalorieIntake - caloriesConsumed + caloriesBurned

    const exerciseTimeRemaining =
      user.dailyExerciseTime -
      diary.exercises.reduce((sum, e) => sum + e.duration, 0)

    return {
      caloriesConsumed,
      caloriesBurned,
      caloriesRemaining,
      exerciseTimeRemaining
    }
  }
}
