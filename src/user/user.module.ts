import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getCloudinaryConfig } from 'config'
import { CLOUDINARY_INJECTION_TOKEN } from 'constants/tokens'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: CLOUDINARY_INJECTION_TOKEN,
      inject: [ConfigService],
      useFactory: getCloudinaryConfig
    }
  ],
  exports: [UserService]
})
export class UserModule {}
