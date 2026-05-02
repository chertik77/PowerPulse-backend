import type { User } from 'generated/prisma/client'

import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from 'common/decorators'
import { DailyIntakeFormCompletionGuard, JwtAuthGuard } from 'common/guards'

import { DiaryService } from './diary.service'
import { AddExerciseResponse } from './entities/diary-exercise.entity'
import { AddProductResponse } from './entities/diary-product.entity'
import { Diary } from './entities/diary.entity'
import { AddExerciseInput } from './inputs/add-exercise.input'
import { AddProductInput } from './inputs/add-product.input'
import { GetDiaryInput } from './inputs/get-diary.input'
import { RemoveExerciseInput } from './inputs/remove-exercise.input'
import { RemoveProductInput } from './inputs/remove-product.input'

@UseGuards(JwtAuthGuard, DailyIntakeFormCompletionGuard)
@Resolver()
export class DiaryResolver {
  constructor(private readonly diaryService: DiaryService) {}

  @Query(() => Diary)
  async diary(@CurrentUser() user: User, @Args('input') input: GetDiaryInput) {
    return await this.diaryService.getDiary(user, input)
  }

  @Mutation(() => AddProductResponse)
  async addProductToDiary(
    @CurrentUser('id') userId: string,
    @Args('input') input: AddProductInput
  ) {
    return await this.diaryService.addProductToDiary(userId, input)
  }

  @Mutation(() => AddExerciseResponse)
  async addExerciseToDiary(
    @CurrentUser('id') userId: string,
    @Args('input') input: AddExerciseInput
  ) {
    return await this.diaryService.addExerciseToDiary(userId, input)
  }

  @Mutation(() => Boolean)
  async removeProductFromDiary(@Args('input') input: RemoveProductInput) {
    return await this.diaryService.removeProductFromDiary(input)
  }

  @Mutation(() => Boolean)
  async removeExerciseFromDiary(@Args('input') input: RemoveExerciseInput) {
    return await this.diaryService.removeExerciseFromDiary(input)
  }
}
