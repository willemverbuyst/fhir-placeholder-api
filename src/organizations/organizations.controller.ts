import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const organization = await this.organizationsService.findOne(id);

    if (!organization) {
      throw new NotFoundException('organization not found');
    }

    return organization;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const organization = await this.organizationsService.remove(id);

    if (!organization) {
      throw new NotFoundException('organization not found');
    }

    return organization;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: CreateOrganizationDto,
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
