import type { ActivityLevel } from 'common/constants'

import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  Min,
  MinLength
} from 'class-validator'
import { Blood, Sex } from 'generated/prisma/enums'
import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.mjs'

import { ACTIVITY_LEVEL } from 'common/constants'

registerEnumType(Blood, { name: 'Blood' })
registerEnumType(Sex, { name: 'Sex' })

@InputType()
export class UpdateUserInput {
  @MinLength(2, { message: 'Name should be at least 2 characters long' })
  @IsOptional()
  @Field({ nullable: true })
  name?: string

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string

  @Min(150, { message: 'Height should be at least 150 cm' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  height?: number

  @Min(35, { message: 'Current weight should be at least 35 kg' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  currentWeight?: number

  @Min(35, { message: 'Desired weight should be at least 35 kg' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  desiredWeight?: number

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field({ nullable: true })
  birthday?: Date

  @IsEnum(Sex)
  @IsOptional()
  @Field(() => Sex, { nullable: true })
  sex?: Sex

  @IsEnum(Blood)
  @IsOptional()
  @Field(() => Blood, { nullable: true })
  blood?: Blood

  @IsIn(ACTIVITY_LEVEL)
  @Type(() => Number)
  @IsOptional()
  @Field(() => Int, { nullable: true })
  activityLevel?: ActivityLevel

  @Field(() => GraphQLUpload, { nullable: true })
  avatar?: FileUpload
}
