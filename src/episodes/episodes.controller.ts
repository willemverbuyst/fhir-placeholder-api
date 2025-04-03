import { Controller, Get, Param, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(@Query('patient') patient?: string) {
    if (!patient) {
      return this.episodesService.findAll();
    }
    return this.episodesService.findByPatientId(patient);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }
}
