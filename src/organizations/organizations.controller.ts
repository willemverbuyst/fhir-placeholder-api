import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationDto } from './dto/organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiOkResponse({
    description: 'The organization is created successfully',
    type: OrganizationDto,
  })
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @ApiOkResponse({
    description: 'All organizations',
    type: OrganizationDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name to filter organizations',
    type: String,
  })
  @Get()
  async findAll(@Query('name') name?: string) {
    if (name) {
      return this.organizationsService.findByName(name);
    }
    return this.organizationsService.findAll();
  }

  @ApiOkResponse({
    description: 'The organization is returned successfully',
    type: OrganizationDto,
  })
  @ApiNotFoundResponse({
    description: 'Organization not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const organization = await this.organizationsService.findOne(id);

    if (!organization) {
      throw new NotFoundException('organization not found');
    }

    return organization;
  }

  @ApiOkResponse({
    description: 'The organization is deleted successfully',
    type: OrganizationDto,
  })
  @ApiNotFoundResponse({
    description: 'Organization not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const organization = await this.organizationsService.remove(id);

    if (!organization) {
      throw new NotFoundException('organization not found');
    }

    return organization;
  }

  @ApiOkResponse({
    description: 'The organization is updated successfully',
    type: OrganizationDto,
  })
  @ApiNotFoundResponse({
    description: 'Organization not found',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
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
