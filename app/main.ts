import type { NestExpressApplication } from '@nestjs/platform-express'

import { NestFactory } from '@nestjs/core'

import * as cookieParser from 'cookie-parser'
import * as mongoose from 'mongoose'
import * as morgan from 'morgan'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('api')

  app.use(cookieParser())

  app.use(morgan('dev'))

  app.disable('x-powered-by')

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS!,
    credentials: true,
    exposedHeaders: 'Set-Cookie'
  })

  await app.listen(process.env.PORT!)
}

bootstrap()

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_, ret) {
    if (ret.password) delete ret.password

    delete ret._id
  }
})
