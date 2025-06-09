import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import type { Bundle, Organization } from "fhir/r5";
import * as sanitizeHtml from "sanitize-html";
import type { Id } from "src/types";
// biome-ignore lint/style/useImportType: nestjs quirk
import { CreateOrganizationDto } from "./dto/create-organization.dto";
// biome-ignore lint/style/useImportType: nestjs quirk
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { organizationBundleExample } from "./examples/organization-bundle.example";
import { organizationExample } from "./examples/organization.example";
// biome-ignore lint/style/useImportType: nestjs quirk
import { OrganizationService } from "./organization.service";

@Controller("Organization")
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationService) {}

  @ApiOkResponse({
    description: "The organization is created successfully",
    example: organizationExample,
  })
  @Post()
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization & Id> {
    const name = sanitizeHtml(createOrganizationDto.name, {
      allowedTags: [],
      allowedAttributes: {},
    });
    return this.organizationsService.create({
      name,
      active: createOrganizationDto.active,
    });
  }

  @ApiOkResponse({
    description: "All organizations",
    example: organizationBundleExample,
  })
  @Get()
  async findAll(): Promise<Bundle<Organization & Id>> {
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
  async findOne(@Param("id") id: string): Promise<Organization & Id> {
    const organization = await this.organizationsService.findOne(id);
    if (!organization) {
      throw new NotFoundException("organization not found");
    }
    return organization;
  }

  @ApiOkResponse({
    description: "The organization is updated successfully",
    example: organizationExample,
  })
  @ApiNotFoundResponse({
    description: "Organization not found",
  })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization & Id> {
    const organization = await this.organizationsService.update(
      id,
      updateOrganizationDto,
    );
    if (!organization) {
      throw new NotFoundException("organization not found");
    }
    return organization;
  }
}
