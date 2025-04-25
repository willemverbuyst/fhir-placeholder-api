import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { Bundle, EpisodeOfCare } from "fhir/r5";
import { Id } from "src/types";
import { GetEpisodeDto } from "./dto/get-episode-of-care.dto";
import { EpisodeOfCareService } from "./episode-of-care.service";
import { episodeOFCareBundleExample } from "./examples/episode-of-care-bundle.example";
import { episodeOfCareExample } from "./examples/episode-of-care.example";

@Controller("EpisodeOfCare")
export class EpisodeOfCareController {
  constructor(private readonly episodesService: EpisodeOfCareService) {}

  @ApiOkResponse({
    description: "All episodes",
    example: episodeOFCareBundleExample,
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Patient ID to filter episodes by patient",
    type: String,
  })
  @ApiQuery({
    name: "diagnosis reference",
    required: false,
    description: "Diagnosis reference to filter episodes by condition",
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
    query?: GetEpisodeDto,
  ): Promise<Bundle<EpisodeOfCare & Id>> {
    return await this.episodesService.findAll(query);
  }

  @ApiOkResponse({
    description: "The episode is returned successfully",
    example: episodeOfCareExample,
  })
  @ApiNotFoundResponse({
    description: "Episode not found",
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<EpisodeOfCare & Id> {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new NotFoundException("episode not found");
    }
    return episode;
  }
}
