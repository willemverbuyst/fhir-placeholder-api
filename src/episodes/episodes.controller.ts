import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
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
  async findAll(@Query('patient') patient?: string) {
    if (!patient) {
      return await this.episodesService.findAll();
    }
    return await this.episodesService.findByPatientId(patient);
  }

  @ApiOkResponse({
    description: 'The episode is returned successfully',
    type: EpisodeDto,
  })
  @ApiNotFoundResponse({
    description: 'Episode not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const episode = await this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    return episode;
  }
}
