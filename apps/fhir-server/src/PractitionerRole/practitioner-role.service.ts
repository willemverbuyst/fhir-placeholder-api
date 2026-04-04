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
    // let resources = this.repo.practitionerRoles;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { organization, practitioner } = query;

    // if (organization) {
    //   resources = resources.filter((p) =>
    //     p.organization?.reference?.endsWith(organization),
    //   );
    // }

    // if (practitioner) {
    //   resources = resources.filter((p) =>
    //     p.practitioner?.reference?.endsWith(practitioner),
    //   );
    // }

    if (query?.practitioner) {
      const resources: { resource: TPractitionerRole }[] =
        await this.repo.query(
          `SELECT resource FROM practitioner_role WHERE resource->'practitioner'->>'reference' = $1`,
          [`Practitioner/${query.practitioner}`],
        );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.organization) {
      const resources: { resource: TPractitionerRole }[] =
        await this.repo.query(
          `SELECT resource FROM practitioner_role WHERE resource->'organization'->>'reference' = $1`,
          [`Organization/${query.organization}`],
        );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
