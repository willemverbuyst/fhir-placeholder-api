import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { EpisodeDto } from './dto/episode.dto';
import { GetEpisodeDto } from './dto/get-episode.dto';
import { EpisodeOfCareService } from './episode-of-care.service';

@Controller('EpisodeOfCare')
export class EpisodeOfCareController {
  constructor(private readonly episodesService: EpisodeOfCareService) {}

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
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    data?: GetEpisodeDto,
  ) {
    if (data?.patient) {
      return await this.episodesService.findByPatientId(data.patient);
    }

    return await this.episodesService.findAll();
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
      throw new NotFoundException('episode not found');
    }
    return episode;
  }
}
