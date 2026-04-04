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

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
