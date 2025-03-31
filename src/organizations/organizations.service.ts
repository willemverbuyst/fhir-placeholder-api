import { Injectable } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly repo: DataStore) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return 'This action adds a new organization';
  }

  findAll() {
    return this.repo.organizations;
  }

  findOne(id: number) {
    return this.repo.organizations.find((org) => org.id === String(id));
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
