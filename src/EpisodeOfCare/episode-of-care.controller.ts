import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Bundle, EpisodeOfCare } from 'fhir/r5';
import { GetEpisodeDto } from './dto/get-episode-of-care.dto';
import { EpisodeOfCareService } from './episode-of-care.service';
import { episodeOFCareBundleExample } from './examples/episode-of-care-bundle.example';
import { episodeOfCareExample } from './examples/episode-of-care.example';

@Controller('EpisodeOfCare')
export class EpisodeOfCareController {
  constructor(private readonly episodesService: EpisodeOfCareService) {}

  @ApiOkResponse({
    description: 'All episodes',
    example: episodeOFCareBundleExample,
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
  ): Promise<Bundle<EpisodeOfCare>> {
    if (data?.patient) {
      return await this.episodesService.findByPatientId(data.patient);
    }

    return await this.episodesService.findAll();
  }

  @ApiOkResponse({
    description: 'The episode is returned successfully',
    example: episodeOfCareExample,
  })
  @ApiNotFoundResponse({
    description: 'Episode not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EpisodeOfCare> {
    const episode = await this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException('episode not found');
    }
    return episode;
  }
}
