import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import type { Bundle, Organization } from "fhir/r5";
import { organizationBundleExample } from "./examples/organization-bundle.example";
import { organizationExample } from "./examples/organization.example";
import { OrganizationService } from "./organization.service";

@Controller("Organization")
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationService) {}

  @ApiOkResponse({
    description: "All organizations",
    example: organizationBundleExample,
  })
  @Get()
  async findAll(): Promise<Bundle<Organization>> {
    return this.organizationsService.findAll();
  }

  @ApiOkResponse({
    description: "The organization is returned successfully",
    example: organizationExample,
  })
  @ApiNotFoundResponse({
    description: "Organization not found",
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Organization> {
    const organization = await this.organizationsService.findOne(id);
    if (!organization) {
      throw new NotFoundException("organization not found");
    }
    return organization;
  }
}
