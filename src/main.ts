import type { NestExpressApplication } from '@nestjs/platform-express'

import { NestFactory } from '@nestjs/core'

import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import { TypedConfigService } from 'typed-config-service'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(TypedConfigService)

  app.setGlobalPrefix('api')

  app.use(cookieParser())

  app.use(logger('dev'))

  app.disable('x-powered-by')

  app.enableCors({
    origin: configService.get('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: 'Set-Cookie'
  })

  await app.listen(configService.get('PORT', { shouldThrow: true }))
}

bootstrap()
