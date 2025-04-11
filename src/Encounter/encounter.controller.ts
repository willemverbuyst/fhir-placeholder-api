import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Bundle, Encounter } from 'fhir/r5';
import { EncounterService } from './encounter.service';
import { encounterBundleExample } from './examples/encounter-bundle.example';

@Controller('encounter')
export class EncounterController {
  constructor(private readonly encounterService: EncounterService) {}

  @ApiOkResponse({
    description: 'All encounters',
    example: encounterBundleExample,
  })
  @Get()
  async findAll(): Promise<Bundle<Encounter>> {
    return await this.encounterService.findAll();
  }
}
