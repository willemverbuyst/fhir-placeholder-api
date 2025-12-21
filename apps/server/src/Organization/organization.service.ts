import { Injectable } from "@nestjs/common";
import type { Bundle, Organization } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";
import type { CreateOrganizationDto } from "./dto/create-organization.dto";
import type { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Injectable()
export class OrganizationService {
  constructor(private readonly repo: DataStoreService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const newOrganization: Organization = {
      id: `organization-${String(this.repo.organizations.length + 1)}`,
      resourceType: "Organization",
      ...createOrganizationDto,
    };

    this.repo.organizations.push(newOrganization);

    return newOrganization;
  }

  async findAll(): Promise<Bundle<Organization>> {
    const resources = this.repo.organizations;

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<Organization | undefined> {
    return this.repo.organizations.find((org) => org.id === id);
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
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
}
