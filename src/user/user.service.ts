import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common'

import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { SignupDto } from 'auth/dto'
import { v2 } from 'cloudinary'
import { PrismaService } from 'prisma/prisma.service'

import { getAgeFromBirthDate } from 'utils'

import { CalculateDailyIntakeDto, UpdateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(userId: string) {
    const user = await this.findById(userId)

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async calculateDailyIntake(
    userCharacteristics: CalculateDailyIntakeDto,
    userId: string
  ) {
    const dailyCalorieIntake = Math.floor(
      this.getBasalMetabolicRateByGender(userCharacteristics)!
    )

    const { dailyExerciseTime } = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userCharacteristics,
        dailyCalorieIntake,
        isDailyIntakeFormCompleted: true,
        birthday: new Date(userCharacteristics.birthday)
      }
    })

    return { dailyCalorieIntake, dailyExerciseTime }
  }

  async update(file: Express.Multer.File, userId: string, dto: UpdateUserDto) {
    let avatar: string | null = null

    if (file) {
      await new Promise(resolve => {
        v2.uploader
          .upload_stream((error, uploadResult) => {
            if (error) throw new UnprocessableEntityException(error.message)
            return resolve((avatar = uploadResult?.url as string))
          })
          .end(file.buffer)
      })
    }

    const user = await this.prisma.user.updateIgnoreNotFound({
      where: { id: userId },
      data: { ...dto, avatar },
      omit: { password: true }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async findById(id: string, select?: Prisma.UserSelect) {
    return await this.prisma.user.findFirst({
      where: { id },
      select
    })
  }

  async findOneByEmail(email: string, select?: Prisma.UserSelect) {
    return await this.prisma.user.findUnique({ where: { email }, select })
  }

  async createNewUser(dto: SignupDto, select?: Prisma.UserSelect) {
    return await this.prisma.user.create({
      data: { ...dto, password: await hash(dto.password) },
      select
    })
  }

  private getBasalMetabolicRateByGender({
    activityLevel,
    birthday,
    height,
    currentWeight,
    sex
  }: CalculateDailyIntakeDto) {
    const lifeStyleCoefficient = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 }

    const age = getAgeFromBirthDate(birthday)

    if (sex === 'male') {
      return (
        (10 * currentWeight + 6.25 * height - 5 * age + 5) *
        lifeStyleCoefficient[activityLevel]
      )
    }

    if (sex === 'female') {
      return (
        (10 * currentWeight + 6.25 * height - 5 * age - 161) *
        lifeStyleCoefficient[activityLevel]
      )
    }
  }
}
