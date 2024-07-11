import { Controller, Get } from '@nestjs/common'

import { ExerciseService } from './exercise.service'

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  getAllExercises() {
    return this.exerciseService.getAllExercises()
  }
}
