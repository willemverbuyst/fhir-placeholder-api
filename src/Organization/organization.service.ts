import { Injectable } from '@nestjs/common';
import { Bundle, Organization } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { DataStoreService } from '../db/dataStore.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly repo: DataStoreService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const newOrganization: Organization = {
      id: uuidV4(),
      resourceType: 'Organization',
      active: true,
      ...createOrganizationDto,
    };

    this.repo.organizations.push(newOrganization);

    return newOrganization;
  }

  async findAll(): Promise<Bundle<Organization>> {
    const resources = this.repo.organizations;
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: resources.length,
      entry: resources.map((resource) => ({
        fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
        resource,
      })),
    };
  }

  async findOne(id: string): Promise<Organization | undefined> {
    return this.repo.organizations.find((org) => org.id === id);
  }

  async update(
    id: string,
    updateOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization | undefined> {
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

  async findByName(name: string): Promise<Bundle<Organization>> {
    const resources = this.repo.organizations.filter(
      (o) => o.name?.toLocaleLowerCase() === name.toLocaleLowerCase(),
    );
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: resources.length,
      entry: resources.map((resource) => ({
        fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
        resource,
      })),
    };
  }
}
