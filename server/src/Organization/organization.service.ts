import { Injectable } from "@nestjs/common";
import type { Bundle, Organization } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import type { Id } from "../types";
import { wrapInBundle } from "../utils/bundle";
import type { CreateOrganizationDto } from "./dto/create-organization.dto";

@Injectable()
export class OrganizationService {
  constructor(private readonly repo: DataStoreService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization & Id> {
    const newOrganization: Organization & Id = {
      id: String(this.repo.organizations.length),
      resourceType: "Organization",
      active: true,
      ...createOrganizationDto,
    };

    this.repo.organizations.push(newOrganization);

    return newOrganization;
  }

  async findAll(): Promise<Bundle<Organization & Id>> {
    const resources = this.repo.organizations;

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<(Organization & Id) | undefined> {
    return this.repo.organizations.find((org) => org.id === id);
  }

  async update(
    id: string,
    updateOrganizationDto: CreateOrganizationDto,
  ): Promise<(Organization & Id) | undefined> {
    const organization = await this.findOne(id);

    if (organization) {
      const updatedOrganization: Organization & Id = {
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
}
