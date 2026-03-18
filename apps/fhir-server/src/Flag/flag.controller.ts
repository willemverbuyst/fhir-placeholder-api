import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, Flag } from "fhir/r5";
import { GetFlagDto } from "./dto/get-flag.dto";
import { FlagService } from "./flag.service";

@Controller("Flag")
export class FlagController {
  constructor(private readonly flagService: FlagService) {}

  @ApiOkResponse({
    description: "All flags",
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Filter flags by subject",
    type: String,
  })
  @ApiQuery({
    name: "encounter",
    required: false,
    description: "Filter flags by encounter",
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
    query?: GetFlagDto,
  ): Promise<Bundle<Flag>> {
    return this.flagService.findAll(query);
  }
}
