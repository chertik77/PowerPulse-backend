import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Blood, Sex } from 'generated/prisma/enums'

registerEnumType(Blood, { name: 'Blood' })
registerEnumType(Sex, { name: 'Sex' })

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field(() => Int, { nullable: true })
  height?: number

  @Field(() => Int, { nullable: true })
  currentWeight?: number

  @Field(() => Int, { nullable: true })
  desiredWeight?: number

  @Field({ nullable: true })
  birthday?: Date

  @Field(() => Sex, { nullable: true })
  sex?: Sex

  @Field(() => Blood, { nullable: true })
  blood?: Blood

  @Field()
  isDailyIntakeFormCompleted: boolean

  @Field(() => Int, { nullable: true })
  activityLevel?: number

  @Field(() => Int, { nullable: true })
  dailyCalorieIntake?: number

  @Field(() => Int)
  dailyExerciseTime: number

  @Field({ nullable: true })
  avatar?: string
}
