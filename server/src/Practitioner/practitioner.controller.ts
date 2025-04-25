import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { Bundle, Practitioner } from "fhir/r5";
import { Id } from "src/types";
import { practitionerBundleExample } from "./examples/practitioner-bundle.example";
import { practitionerExample } from "./examples/practitioner.example";
import { PractitionerService } from "./practitioner.service";

@Controller("Practitioner")
export class PractitionerController {
  constructor(private readonly practitionersService: PractitionerService) {}

  @ApiOkResponse({
    description: "All practitioners",
    example: practitionerBundleExample,
  })
  @Get()
  async findAll(): Promise<Bundle<Practitioner & Id>> {
    return await this.practitionersService.findAll();
  }

  @ApiOkResponse({
    description: "The practitioner is returned successfully",
    example: practitionerExample,
  })
  @ApiNotFoundResponse({
    description: "Practitioner not found",
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Practitioner & Id> {
    const practitioner = await this.practitionersService.findOne(id);
    if (!practitioner) {
      throw new NotFoundException("practitioner not found");
    }
    return practitioner;
  }
}
