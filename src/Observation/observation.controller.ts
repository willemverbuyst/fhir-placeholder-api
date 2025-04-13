import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { observationBundleExample } from './examples/observation-bundle-example';
import { ObservationService } from './observation.service';

@Controller('Observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @ApiOkResponse({
    description: 'All encounters',
    example: observationBundleExample,
  })
  @Get()
  findAll() {
    return this.observationService.findAll();
  }
}
