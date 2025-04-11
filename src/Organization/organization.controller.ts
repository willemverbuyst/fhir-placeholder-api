import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Bundle, Organization } from 'fhir/r5';
import * as sanitizeHtml from 'sanitize-html';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { organizationBundleExample } from './examples/organization-bundle.example';
import { organizationExample } from './examples/organization.example';
import { OrganizationService } from './organization.service';

@Controller('Organization')
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationService) {}

  @ApiOkResponse({
    description: 'The organization is created successfully',
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
  ): Promise<Organization> {
    const name = sanitizeHtml(createOrganizationDto.name, {
      allowedTags: [],
      allowedAttributes: {},
    });
    return this.organizationsService.create({ name });
  }

  @ApiOkResponse({
    description: 'All organizations',
    example: organizationBundleExample,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name to filter organizations',
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
    data?: GetOrganizationDto,
  ): Promise<Bundle<Organization>> {
    if (data?.name) {
      return this.organizationsService.findByName(data.name);
    }

    return this.organizationsService.findAll();
  }

  @ApiOkResponse({
    description: 'The organization is returned successfully',
    example: organizationExample,
  })
  @ApiNotFoundResponse({
    description: 'Organization not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Organization> {
    const organization = await this.organizationsService.findOne(id);
    if (!organization) {
      throw new NotFoundException('organization not found');
    }
    return organization;
  }

  @ApiOkResponse({
    description: 'The organization is updated successfully',
    example: organizationExample,
  })
  @ApiNotFoundResponse({
    description: 'Organization not found',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.organizationsService.update(
      id,
      updateOrganizationDto,
    );
    if (!organization) {
      throw new NotFoundException('organization not found');
    }
    return organization;
  }
}
