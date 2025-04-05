import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { EpisodeDto } from './dto/episode.dto';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @ApiOkResponse({
    description: 'All episodes',
    type: EpisodeDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'patient',
    required: false,
    description: 'Patient ID to filter episodes by patient',
    type: String,
  })
  @Get()
  findAll(@Query('patient') patient?: string) {
    if (!patient) {
      return this.episodesService.findAll();
    }
    return this.episodesService.findByPatientId(patient);
  }

  @ApiOkResponse({
    description: 'The episode is returned successfully',
    type: EpisodeDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }
}
