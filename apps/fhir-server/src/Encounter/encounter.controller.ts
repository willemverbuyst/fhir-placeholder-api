import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, Encounter } from "fhir/r5";
import { GetEncounterDto } from "./dto/get-encounter.dto";
import { EncounterService } from "./encounter.service";
import { encounterBundleExample } from "./examples/encounter-bundle.example";

@Controller("Encounter")
export class EncounterController {
  constructor(private readonly encounterService: EncounterService) {}

  @ApiOkResponse({
    description: "All encounters",
    example: encounterBundleExample,
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Filter encounters by subject",
    type: String,
  })
  @ApiQuery({
    name: "episode-of-care",
    required: false,
    description: "Filter encounters by episode of care",
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
    query?: GetEncounterDto,
  ): Promise<Bundle<Encounter>> {
    return await this.encounterService.findAll(query);
  }
}
