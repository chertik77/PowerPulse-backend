import type { NestExpressApplication } from '@nestjs/platform-express'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import logger from 'morgan'

import { RootConfig } from 'config'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = app.get(RootConfig)

  app.setGlobalPrefix('api')

  app.use(cookieParser())

  app.use(logger(app.get('env') === 'development' ? 'dev' : 'combined'))

  app.use(helmet())
  app.disable('x-powered-by')

  app.enableCors({ origin: config.ALLOWED_ORIGINS, credentials: true })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    })
  )

  await app.listen(config.PORT)
}

bootstrap()
