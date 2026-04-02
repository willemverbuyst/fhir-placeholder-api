import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, Practitioner, Resource } from "fhir/r5";
import { GetPractitionerDto } from "./dto/get-practitioner.dto";
import { practitionerExample } from "./examples/practitioner.example";
import { practitionerBundleExample } from "./examples/practitioner-bundle.example";
import { PractitionerService } from "./practitioner.service";

@Controller("Practitioner")
export class PractitionerController {
  constructor(private readonly practitionersService: PractitionerService) {}

  @ApiOkResponse({
    description: "All practitioners",
    example: practitionerBundleExample,
  })
  @ApiQuery({
    name: "_include",
    required: false,
    description: "Include PractitionerRole resources by practitioner reference",
    type: String,
  })
  @ApiQuery({
    name: "_include:iterate",
    required: false,
    description:
      "Include Organization resources via PractitionerRole references",
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
    query?: GetPractitionerDto,
  ): Promise<Bundle<Resource>> {
    return await this.practitionersService.findAll(query);
  }

  @ApiOkResponse({
    description: "The practitioner is returned successfully",
    example: practitionerExample,
  })
  @ApiNotFoundResponse({
    description: "Practitioner not found",
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Practitioner> {
    const practitioner = await this.practitionersService.findOne(id);
    if (!practitioner) {
      throw new NotFoundException("practitioner not found");
    }
    return practitioner;
  }
}
