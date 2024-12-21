import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common'

import { hash } from 'argon2'
import { v2 } from 'cloudinary'
import { PrismaService } from 'prisma/prisma.service'
import { getAgeFromBirthDate } from 'utils'

import { SignupDto } from 'auth/dto'

import { UpdateUserDto, UserCharacteristicsDto } from './dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(userId: string) {
    const user = await this.findById(userId)

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async calculateDailyIntake(
    userCharacteristics: UserCharacteristicsDto,
    userId: string
  ) {
    const dailyIntake = Math.floor(
      this.getBasalMetabolicRateByGender(userCharacteristics)!
    )

    const { dailyExerciseTime } = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userCharacteristics,
        dailyCalorieIntake: dailyIntake,
        birthday: new Date(userCharacteristics.birthday)
      }
    })

    return { dailyIntake, dailyExerciseTime }
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

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto, avatar },
      omit: { password: true }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: { id },
      omit: { password: true }
    })
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async createNewUser(dto: SignupDto) {
    return await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password)
      },
      omit: { password: true }
    })
  }

  private getBasalMetabolicRateByGender({
    activityLevel,
    birthday,
    height,
    currentWeight,
    sex
  }: UserCharacteristicsDto) {
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
