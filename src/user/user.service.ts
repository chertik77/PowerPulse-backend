import type { Model } from 'mongoose'

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { hash } from 'argon2'
import { v2 } from 'cloudinary'
import { getAge } from 'helpers'

import { SignupDto } from 'auth/auth.dto'

import { User } from 'schemas'

import { DailyCalorieIntake, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async dailyCalorieIntake(dto: DailyCalorieIntake, userId: string) {
    const dailyCalorieIntake = this.getBasalMetabolicRateByGender(dto)

    await this.userModel.findByIdAndUpdate(userId, {
      sex: dto.sex,
      height: dto.height,
      currentWeight: dto.currentWeight,
      desiredWeight: dto.desiredWeight,
      birthday: dto.birthday,
      blood: dto.blood,
      activityLevel: dto.activityLevel
    })

    return { dailyCalorieIntake: Math.floor(dailyCalorieIntake!) }
  }

  async me(id: string) {
    const user = await this.findById(id)

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async update(file: Express.Multer.File, userId: string, dto: UpdateUserDto) {
    let avatar

    if (file) {
      await new Promise(resolve => {
        v2.uploader
          .upload_stream((error, uploadResult) => {
            if (error) throw new UnprocessableEntityException(error.message)

            return resolve((avatar = uploadResult?.url))
          })
          .end(file.buffer)
      })
    }

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { ...dto, avatar },
      { new: true }
    )

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  findById(id: string) {
    return this.userModel.findById(id)
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  async createNewUser(dto: SignupDto) {
    return await this.userModel.create({
      ...dto,
      password: await hash(dto.password)
    })
  }

  private getBasalMetabolicRateByGender({
    activityLevel,
    birthday,
    height,
    currentWeight,
    sex
  }: DailyCalorieIntake) {
    const lifeStyleCoefficient = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 }

    const age = getAge(birthday)

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
