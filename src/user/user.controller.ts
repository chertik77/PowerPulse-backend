import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import * as Examples from 'examples'

import { CurrentUser } from 'decorators'
import { Auth } from 'guards'

import { UserCharacteristicsDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
@Auth()
@ApiTags('User')
@ApiBearerAuth()
@ApiUnauthorizedResponse(Examples.UnauthorizedResponseExample)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a current user' })
  @ApiOkResponse(Examples.UserMeResponseExample)
  @ApiNotFoundResponse(Examples.UserNotFoundResponseExample)
  async me(@CurrentUser('id') userId: string) {
    return await this.userService.me(userId)
  }

  @Post('daily-intake')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Calculate daily intake' })
  @ApiBadRequestResponse(Examples.UserDailyIntakeBadRequestResponseExample)
  @ApiCreatedResponse(Examples.UserDailyIntakeResponseExample)
  calculateDailyIntake(
    @Body() userCharacteristics: UserCharacteristicsDto,
    @CurrentUser('id') userId: string
  ) {
    return this.userService.calculateDailyIntake(userCharacteristics, userId)
  }
}
