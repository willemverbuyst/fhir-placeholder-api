import { Controller, Get } from '@nestjs/common';
import { ObservationService } from './observation.service';

@Controller('Observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Get()
  findAll() {
    return this.observationService.findAll();
  }
}
