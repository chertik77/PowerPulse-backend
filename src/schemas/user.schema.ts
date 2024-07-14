import type { HydratedDocument } from 'mongoose'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { getAge } from 'helpers'
import { ActivityLevel, activityLevel, Blood, blood, Sex, sex } from 'types'
import isEmail from 'validator/lib/isEmail'

export type UserDocument = HydratedDocument<User>

export const MINIMUM_AGE_REQUIRED = 16

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, minlength: 2 })
  name: string

  @Prop({
    required: true,
    unique: true,
    validate: (v: string) => {
      if (!isEmail(v)) throw new Error('Invalid email')
    }
  })
  email: string

  @Prop({ required: true, minlength: 6 })
  password: string

  @Prop()
  avatar: string

  @Prop({ min: 150 })
  height: number

  @Prop({ min: 35 })
  currentWeight: number

  @Prop({ min: 35 })
  desiredWeight: number

  @Prop({
    validate: (v: string) => {
      if (getAge(v) < MINIMUM_AGE_REQUIRED) {
        throw new Error('User must be at least 16 years old')
      }
    }
  })
  birthday: string

  @Prop()
  dailyCalorieIntake: number

  @Prop({ default: 110 })
  dailyNormOfSports: number

  @Prop({ enum: blood })
  blood: Blood

  @Prop({ enum: sex })
  sex: Sex

  @Prop({ enum: activityLevel })
  activityLevel: ActivityLevel
}

export const UserSchema = SchemaFactory.createForClass(User)
