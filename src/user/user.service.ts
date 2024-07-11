import type { Model } from 'mongoose'

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { hash } from 'argon2'
import { v2 } from 'cloudinary'

import { SignupDto } from 'auth/auth.dto'

import { User } from 'schemas'

import { CalculateDailyNormsDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async calculateDailyNorms(dto: CalculateDailyNormsDto) {
    const dailyNorm = this.getBasalMetabolicRateByGender(dto)

    return { dailyCalorieIntake: Math.floor(dailyNorm!) }
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
    const hashedPassword = await hash(dto.password)

    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword
    })

    return user
  }

  private getBasalMetabolicRateByGender({
    activityLevel,
    birthDate,
    height,
    currentWeight,
    gender
  }: CalculateDailyNormsDto) {
    const lifeStyleCoefficient = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 }

    const age = this.getAge(birthDate)

    if (gender === 'male') {
      return (
        (10 * currentWeight + 6.25 * height - 5 * age + 5) *
        lifeStyleCoefficient[activityLevel]
      )
    }

    if (gender === 'female') {
      return (
        (10 * currentWeight + 6.25 * height - 5 * age - 161) *
        lifeStyleCoefficient[activityLevel]
      )
    }
  }

  protected getAge(birthDate: string) {
    const today = new Date()
    const dateOfBirth = new Date(birthDate)
    let age = today.getFullYear() - dateOfBirth.getFullYear()
    const month = today.getMonth() - dateOfBirth.getMonth()

    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--
    }

    return age
  }
}
