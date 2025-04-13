import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Bundle, Encounter } from 'fhir/r5';
import { Id } from 'src/types';
import { EncounterService } from './encounter.service';
import { encounterBundleExample } from './examples/encounter-bundle.example';

@Controller('Encounter')
export class EncounterController {
  constructor(private readonly encounterService: EncounterService) {}

  @ApiOkResponse({
    description: 'All encounters',
    example: encounterBundleExample,
  })
  @Get()
  async findAll(): Promise<Bundle<Encounter & Id>> {
    return await this.encounterService.findAll();
  }
}
