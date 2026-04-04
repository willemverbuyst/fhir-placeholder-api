import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import type { Bundle, Organization as TOrganization } from "fhir/r5";
import { Repository } from "typeorm/repository/Repository";
import { wrapInBundle } from "../utils/bundle";
import { Organization } from "./organization.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private repo: Repository<Organization>,
  ) {}

  async findAll(): Promise<Bundle<TOrganization>> {
    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TOrganization | undefined> {
    return await this.repo.findOneBy({ id }).then((org) => org?.resource);
  }
}
