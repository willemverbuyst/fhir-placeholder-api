import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { dummyDataConfig } from "@repo/config-scripts";
import type { Bundle, Organization as TOrganization } from "fhir/r5";
import { Repository } from "typeorm/repository/Repository";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";
import type { CreateOrganizationDto } from "./dto/create-organization.dto";
import type { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { Organization } from "./organization.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private repo: Repository<Organization>,
  ) {}

  // async create(
  //   createOrganizationDto: CreateOrganizationDto,
  // ): Promise<Organization> {
  //   const newOrganization: Organization = {
  //     id:
  //       dummyDataConfig.idStrategy === "sequential"
  //         ? `organization-${String(this.repo.organizations.length + 1)}`
  //         : crypto.randomUUID(),
  //     resourceType: "Organization",
  //     ...createOrganizationDto,
  //   };

  //   this.repo.organizations.push(newOrganization);

  //   return newOrganization;
  // }

  async findAll(): Promise<Bundle<TOrganization>> {
    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TOrganization | undefined> {
    return await this.repo.findOneBy({ id }).then((org) => org?.resource);
  }

  // async update(
  //   id: string,
  //   updateOrganizationDto: UpdateOrganizationDto,
  // ): Promise<Organization | undefined> {
  //   const organization = await this.findOne(id);

  //   if (organization) {
  //     const updatedOrganization: Organization = {
  //       ...organization,
  //       ...updateOrganizationDto,
  //     };

  //     this.repo.organizations = this.repo.organizations.map((org) =>
  //       org.id === id ? updatedOrganization : org,
  //     );

  //     return updatedOrganization;
  //   }

  //   return undefined;
  // }
}
