import { Injectable } from '@nestjs/common';
import { Organization } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { DataStoreService } from '../db/dataStore.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly repo: DataStoreService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization: Organization = {
      id: uuidV4(),
      resourceType: 'Organization',
      active: true,
      ...createOrganizationDto,
    };

    this.repo.organizations.push(newOrganization);

    return newOrganization;
  }

  async findAll() {
    return this.repo.organizations;
  }

  async findOne(id: string) {
    return this.repo.organizations.find((org) => org.id === id);
  }

  async update(id: string, updateOrganizationDto: CreateOrganizationDto) {
    const organization = await this.findOne(id);

    if (organization) {
      const updatedOrganization: Organization = {
        ...organization,
        ...updateOrganizationDto,
      };

      this.repo.organizations = this.repo.organizations.map((org) =>
        org.id === id ? updatedOrganization : org,
      );

      return updatedOrganization;
    }

    return undefined;
  }

  async remove(id: string) {
    const organization = await this.findOne(id);

    if (organization) {
      this.repo.organizations = this.repo.organizations.filter(
        (org) => org.id !== id,
      );
      return organization;
    }
    return undefined;
  }

  async findByName(name: string) {
    return this.repo.organizations.filter(
      (o) => o.name?.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
  }
}
