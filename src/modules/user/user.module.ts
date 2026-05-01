import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getCloudinaryConfig } from 'config'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  providers: [
    UserResolver,
    {
      provide: 'Cloudinary',
      inject: [ConfigService],
      useFactory: getCloudinaryConfig
    },
    UserService
  ],
  exports: [UserService]
})
export class UserModule {}
