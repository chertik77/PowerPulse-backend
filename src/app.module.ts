import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ExerciseModule } from './exercise/exercise.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ExerciseModule]
})
export class AppModule {}
