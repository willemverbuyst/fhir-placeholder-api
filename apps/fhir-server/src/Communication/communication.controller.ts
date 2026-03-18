import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, Communication } from "fhir/r5";
import { CommunicationService } from "./communication.service";
import { GetCommunicationDto } from "./dto/get-communication.dto";

@Controller("Communication")
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @ApiOkResponse({
    description: "All communications",
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Filter communications by subject",
    type: String,
  })
  @ApiQuery({
    name: "encounter",
    required: false,
    description: "Filter communications by encounter",
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
    query?: GetCommunicationDto,
  ): Promise<Bundle<Communication>> {
    return this.communicationService.findAll(query);
  }
}
