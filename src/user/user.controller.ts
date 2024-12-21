import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import * as Examples from 'examples'

import { CurrentUser } from 'decorators'
import { Auth } from 'guards'

import { UpdateUserDto, UserCharacteristicsDto } from './dto'
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
  @ApiCreatedResponse(Examples.UserDailyIntakeResponseExample)
  @ApiBadRequestResponse(Examples.UserBadRequestResponseExample)
  calculateDailyIntake(
    @Body() userCharacteristics: UserCharacteristicsDto,
    @CurrentUser('id') userId: string
  ) {
    return this.userService.calculateDailyIntake(userCharacteristics, userId)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Update a user' })
  @ApiConsumes('application/json')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      example: {
        name: 'Jake',
        height: 180,
        currentWeight: 75,
        desiredWeight: 73
      },
      type: 'object',
      properties: { avatar: { type: 'file', format: 'binary' } }
    }
  })
  @ApiOkResponse(Examples.UpdatedUserResponseExample)
  @ApiNotFoundResponse(Examples.UserNotFoundResponseExample)
  @ApiUnprocessableEntityResponse(
    Examples.UserUnprocessableEntityResponseExample
  )
  @ApiBadRequestResponse(Examples.UserBadRequestResponseExample)
  async update(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpeg|png)/ })
        .addMaxSizeValidator({
          maxSize: 200 * 1024,
          message: 'File size should be less than 200kb'
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false
        })
    )
    file: Express.Multer.File
  ) {
    return await this.userService.update(file, userId, dto)
  }
}
