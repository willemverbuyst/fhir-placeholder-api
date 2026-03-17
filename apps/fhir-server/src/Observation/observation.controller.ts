import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, Observation } from "fhir/r5";
import { GetObservationDto } from "./dto/get-observation.dto";
import { observationBundleExample } from "./examples/observation-bundle.example";
import { ObservationService } from "./observation.service";

@Controller("Observation")
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @ApiOkResponse({
    description: "All encounters",
    example: observationBundleExample,
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Filter observations by subject",
    type: String,
  })
  @ApiQuery({
    name: "encounter",
    required: false,
    description: "Filter observations by encounter",
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
    query?: GetObservationDto,
  ): Promise<Bundle<Observation>> {
    return this.observationService.findAll(query);
  }
}
