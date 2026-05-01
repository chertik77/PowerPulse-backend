import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from 'common/decorators'
import { DailyIntakeFormCompletionGuard, JwtAuthGuard } from 'common/guards'

import { DailyIntake } from './entitites/daily-intake.entity'
import { User } from './entitites/user.entity'
import { CalculateDailyIntakeInput } from './inputs/calculate-daily-intake.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { UserService } from './user.service'

@UseGuards(JwtAuthGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => DailyIntake)
  async calculateDailyIntake(
    @Args('input') input: CalculateDailyIntakeInput,
    @CurrentUser('id') userId: string
  ) {
    return await this.userService.calculateDailyIntake(input, userId)
  }

  @UseGuards(DailyIntakeFormCompletionGuard)
  @Query(() => User)
  async me(@CurrentUser('id') userId: string) {
    return await this.userService.me(userId)
  }

  @UseGuards(DailyIntakeFormCompletionGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser('id') userId: string
  ) {
    return this.userService.update(userId, input)
  }
}
