import { Injectable } from "@nestjs/common";
import type { Bundle, PractitionerRole as TPractitionerRole } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { PractitionerRole } from "./practitioner-role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PractitionerRoleService {
  constructor(
    @InjectRepository(PractitionerRole)
    private repo: Repository<PractitionerRole>,
  ) {}

  async findAll(query?: {
    organization?: string;
    practitioner?: string;
  }): Promise<Bundle<TPractitionerRole>> {
    if (query?.practitioner) {
      const entities: { resource: TPractitionerRole }[] = await this.repo.query(
        `SELECT resource FROM practitioner_role WHERE resource->'practitioner'->>'reference' = $1`,
        [`Practitioner/${query.practitioner}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.organization) {
      const entities: { resource: TPractitionerRole }[] = await this.repo.query(
        `SELECT resource FROM practitioner_role WHERE resource->'organization'->>'reference' = $1`,
        [`Organization/${query.organization}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }
}
