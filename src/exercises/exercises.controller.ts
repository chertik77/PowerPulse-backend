import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import * as Examples from 'examples'

import { Auth } from 'guards'

import { SearchExerciseDto, SearchExerciseTypeDto } from './dto'
import { ExercisesService } from './exercises.service'

@Controller('exercises')
@Auth()
@ApiTags('Exercises')
@ApiBearerAuth()
@ApiUnauthorizedResponse(Examples.UnauthorizedResponseExample)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Get all exercises. Only one of the fields `bodyPart`, `equipment`, or `target` can be specified at a time.'
  })
  @ApiOkResponse(Examples.ExercisesResponseExample)
  @ApiBadRequestResponse(Examples.ExercisesBadRequestResponseExample)
  async getAllExercises(@Query() query: SearchExerciseDto) {
    return await this.exercisesService.getAllExercises(query)
  }

  @Get('filters')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all exercises filters' })
  @ApiOkResponse(Examples.ExercisesFiltersResponseExample)
  @ApiBadRequestResponse(Examples.ExercisesFiltersBadRequestResponseExample)
  async getAllExercisesFilters(@Query() query: SearchExerciseTypeDto) {
    return await this.exercisesService.getAllExercisesFilters(query)
  }
}
