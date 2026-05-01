import { Module } from '@nestjs/common'

import { dotenvLoader, TypedConfigModule } from 'nest-typed-config'

import { RootConfig } from 'config/env.config'

@Module({
  imports: [
    TypedConfigModule.forRoot({ schema: RootConfig, load: dotenvLoader() })
  ]
})
export class AppModule {}
