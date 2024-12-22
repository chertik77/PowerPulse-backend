import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getCloudinaryConfig } from 'config'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'Cloudinary',
      inject: [ConfigService],
      useFactory: getCloudinaryConfig
    }
  ],
  exports: [UserService]
})
export class UserModule {}
