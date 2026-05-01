import type { NestExpressApplication } from '@nestjs/platform-express'
import type { EnvironmentVariables } from 'config'

import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import logger from 'morgan'

import { AppModule } from './app.module'

import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const config = app.get(ConfigService<EnvironmentVariables>)

  app.setGlobalPrefix('api')

  app.use(cookieParser())

  app.use(logger(config.get('NODE_ENV') === 'development' ? 'dev' : 'combined'))

  if (config.get('NODE_ENV') === 'production') {
    app.use(helmet())
  }

  app.disable('x-powered-by')

  app.enableCors({ origin: config.get('ALLOWED_ORIGINS'), credentials: true })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(process.env.PORT || 5439)
}

bootstrap()
