import { Module } from '@nestjs/common'

import { CloudinaryProvider } from './cloudinary.provider'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, CloudinaryProvider],
  exports: [UserService]
})
export class UserModule {}
