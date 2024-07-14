import * as NestjsCommon from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { Auth, CurrentUser } from 'decorators'

import { DailyCalorieIntake, UpdateUserDto } from './user.dto'
import { UserService } from './user.service'

@NestjsCommon.Controller('user')
@NestjsCommon.UsePipes(new NestjsCommon.ValidationPipe())
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @NestjsCommon.Post('daily-calorie-intake')
  async dailyCalorieIntake(
    @CurrentUser('id') userId: string,
    @NestjsCommon.Body()
    dailyCalorieIntake: DailyCalorieIntake
  ) {
    return await this.userService.dailyCalorieIntake(dailyCalorieIntake, userId)
  }

  @NestjsCommon.Get('me')
  async me(@CurrentUser('id') userId: string) {
    const userProfile = await this.userService.me(userId)

    return userProfile
  }

  @NestjsCommon.Put()
  @NestjsCommon.HttpCode(200)
  @NestjsCommon.UseInterceptors(FileInterceptor('avatar'))
  async update(
    @CurrentUser('id') userId: string,
    @NestjsCommon.Body() dto: UpdateUserDto,
    @NestjsCommon.UploadedFile(
      new NestjsCommon.ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /(jpeg|png|webp)/ })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: 'File too large'
        })
        .build({ errorHttpStatusCode: 422, fileIsRequired: false })
    )
    file: Express.Multer.File
  ) {
    const updatedUser = await this.userService.update(file, userId, dto)

    return updatedUser
  }
}
