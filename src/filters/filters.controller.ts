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

import { SearchFilterDto } from './dto'
import { FiltersService } from './filters.service'

@Controller('filters')
@Auth()
@ApiTags('Filters')
@ApiBearerAuth()
@ApiUnauthorizedResponse(Examples.UnauthorizedResponseExample)
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all filters' })
  @ApiOkResponse(Examples.FilterResponseExample)
  @ApiBadRequestResponse(Examples.FilterBadRequestResponseExample)
  async getAllFilters(@Query() query: SearchFilterDto) {
    return await this.filtersService.getAllFilters(query)
  }
}
