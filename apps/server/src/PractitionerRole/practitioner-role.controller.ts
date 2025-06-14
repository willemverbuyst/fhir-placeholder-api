import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, PractitionerRole } from "fhir/r5";
import { GetPractitionerRoleDto } from "./dto/get-practitioner-role.dto";
import { practitionerRoleBundleExample } from "./examples/practitioner-role-bundle.example";
import { PractitionerRoleService } from "./practitioner-role.service";

@Controller("PractitionerRole")
export class PractitionerRoleController {
  constructor(
    private readonly practitionerRoleService: PractitionerRoleService,
  ) {}

  @ApiOkResponse({
    description: "All practitioner roles",
    example: practitionerRoleBundleExample,
  })
  @ApiQuery({
    name: "organization",
    required: false,
    description: "Filter practitioner roles by organization",
    type: String,
  })
  @ApiQuery({
    name: "practitioner",
    required: false,
    description: "Filter practitioner roles by practitioner",
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
    query?: GetPractitionerRoleDto,
  ): Promise<Bundle<PractitionerRole>> {
    return await this.practitionerRoleService.findAll(query);
  }
}
