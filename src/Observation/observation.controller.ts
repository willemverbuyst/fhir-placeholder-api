import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Bundle, Observation } from 'fhir/r5';
import { Id } from 'src/types';
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
  findAll(): Promise<Bundle<Observation & Id>> {
    return this.observationService.findAll();
  }
}
