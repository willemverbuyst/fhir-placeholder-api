import { Injectable } from '@nestjs/common';
import { Organization } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { DataStore } from '../db/dataStore.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly repo: DataStore) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization: Organization = {
      id: uuidV4(),
      resourceType: 'Organization',
      active: true,
      ...createOrganizationDto,
    };

    this.repo.organizations.push(newOrganization);

    return newOrganization;
  }

  findAll() {
    return this.repo.organizations;
  }

  findOne(id: string) {
    return this.repo.organizations.find((org) => org.id === id);
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
