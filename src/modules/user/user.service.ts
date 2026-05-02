import type { CalculateDailyIntakeInput } from './inputs/calculate-daily-intake.input'
import type { UpdateUserInput } from './inputs/update-user.input'

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common'

import { v2 as cloudinary } from 'cloudinary'

import { PrismaService } from 'modules/prisma/prisma.service'

import { getAgeFromBirthDate } from 'common/utils'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async calculateDailyIntake(input: CalculateDailyIntakeInput, userId: string) {
    const dailyCalorieIntake = Math.floor(
      this.getBasalMetabolicRateByGender(input)
    )

    const { dailyExerciseTime } = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...input,
        dailyCalorieIntake,
        isDailyIntakeFormCompleted: true
      }
    })

    return { dailyCalorieIntake, dailyExerciseTime }
  }

  async me(userId: string) {
    const user = await this.findById(userId)

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(userId: string, input: UpdateUserInput) {
    let avatar: string | null = null

    if (input.avatar) {
      if (!input.avatar.mimetype.match(/jpeg|png/)) {
        throw new NotAcceptableException('Invalid file type')
      }

      await new Promise(resolve => {
        cloudinary.uploader
          .upload_stream((error, uploadResult) => {
            if (error) throw new UnprocessableEntityException(error.message)
            return resolve((avatar = uploadResult?.url as string))
          })
          .end(input.avatar?.createReadStream())
      })
    }

    const user = await this.prisma.user.updateIgnoreNotFound({
      where: { id: userId },
      data: { ...input, avatar }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  private getBasalMetabolicRateByGender({
    activityLevel,
    birthday,
    height,
    currentWeight,
    sex
  }: CalculateDailyIntakeInput) {
    const METABOLIC_COEFFICIENT = {
      1: 1.2,
      2: 1.375,
      3: 1.55,
      4: 1.725,
      5: 1.9
    }

    const age = getAgeFromBirthDate(birthday)

    if (sex === 'male') {
      return (
        (10 * currentWeight + 6.25 * height - 5 * age + 5) *
        METABOLIC_COEFFICIENT[activityLevel]
      )
    }

    if (sex === 'female') {
      return (
        (10 * currentWeight + 6.25 * height - 5 * age - 161) *
        METABOLIC_COEFFICIENT[activityLevel]
      )
    }

    return 0
  }
}
