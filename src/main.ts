import type { NestExpressApplication } from '@nestjs/platform-express'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Power Pulse API')
    .setDescription(
      'Power Pulse API documentation. This is a REST API for a fitness app.'
    )
    .addBearerAuth()
    .addServer('http://localhost:5432/api', 'Development')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true
  })

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(configService.get('PORT', { shouldThrow: true }))
}

bootstrap()
