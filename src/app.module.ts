import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TypedConfigService } from 'typed-config-service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [TypedConfigService]
})
export class AppModule {}
