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
    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TOrganization | undefined> {
    const entity = await this.repo.findOneBy({ id });
    const resource = entity?.resource;
    return resource;
  }
}
