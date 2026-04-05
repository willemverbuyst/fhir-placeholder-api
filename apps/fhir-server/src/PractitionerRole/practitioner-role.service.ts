import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type {
  Bundle,
  Organization as TOrganization,
  PractitionerRole as TPractitionerRole,
} from "fhir/r5";
import { Repository } from "typeorm";
import { wrapInBundle } from "../utils/bundle";
import { PractitionerRole } from "./practitioner-role.entity";

@Injectable()
export class PractitionerRoleService {
  constructor(
    @InjectRepository(PractitionerRole)
    private repo: Repository<PractitionerRole>,
  ) {}

  async findAll(query?: {
    _include?: string;
    organization?: string;
    practitioner?: string;
  }): Promise<Bundle<TPractitionerRole | TOrganization>> {
    if (query?.practitioner && query._include === "Organization:organization") {
      const entities: {
        practitioner_role: TPractitionerRole;
        organization: TOrganization;
      }[] = await this.repo.query(
        `SELECT 
          pr.resource AS practitioner_role,
          o.resource  AS organization
        FROM practitioner_role pr
        JOIN organization o
        ON o.id = split_part(pr.resource #>> '{organization,reference}', '/', 2)::uuid
        WHERE pr.resource #>> '{practitioner,reference}' = $1`,
        [`Practitioner/${query.practitioner}`],
      );
      const practitionerRoles = entities.map(
        (entity) => entity.practitioner_role,
      );
      const organizations = entities.map((entity) => entity.organization);
      const resources = [...practitionerRoles, ...organizations];
      return wrapInBundle(resources);
    }

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
