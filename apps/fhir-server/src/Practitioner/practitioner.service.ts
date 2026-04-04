import { Injectable } from "@nestjs/common";
import type { Bundle, Practitioner as TPractitioner, Resource } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import type { GetPractitionerDto } from "./dto/get-practitioner.dto";
import { Practitioner } from "./practitioner.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

function getReferenceId(reference?: string): string | undefined {
  if (!reference) {
    return undefined;
  }

  const parts = reference.split("/");
  return parts[parts.length - 1];
}

@Injectable()
export class PractitionerService {
  constructor(
    @InjectRepository(Practitioner)
    private repo: Repository<Practitioner>,
  ) {}

  async findAll(query?: GetPractitionerDto): Promise<Bundle<TPractitioner>> {
    // const practitioners = this.repo.practitioners;
    // const includeRole =
    //   query?._include === "PractitionerRole:practitioner" ||
    //   query?.["_include:iterate"] === "PractitionerRole:organization";
    // const includeOrganization =
    //   query?.["_include:iterate"] === "PractitionerRole:organization";

    // if (!includeRole && !includeOrganization) {
    //   return wrapInBundle(practitioners);
    // }

    // const practitionerIds = new Set(
    //   practitioners.map((practitioner) => practitioner.id),
    // );
    // const practitionerRoles = includeRole
    //   ? this.repo.practitionerRoles.filter((practitionerRole) =>
    //       practitionerIds.has(
    //         getReferenceId(practitionerRole.practitioner?.reference) ?? "",
    //       ),
    //     )
    //   : [];
    // const organizationIds = new Set(
    //   practitionerRoles.map((practitionerRole) =>
    //     getReferenceId(practitionerRole.organization?.reference),
    //   ),
    // );

    // const organizations = includeOrganization
    //   ? this.repo.organizations.filter((organization) =>
    //       organizationIds.has(organization.id),
    //     )
    //   : [];

    // const deduplicatedResources = [
    //   ...new Map<string, Resource>(
    //     [...practitioners, ...practitionerRoles, ...organizations].map(
    //       (resource) => [`${resource.resourceType}/${resource.id}`, resource],
    //     ),
    //   ).values(),
    // ];

    // return wrapInBundle(deduplicatedResources);

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TPractitioner | undefined> {
    // return this.repo.practitioners.find(
    //   (practitioner) => practitioner.id === id,
    // );

    return await this.repo.findOneBy({ id }).then((entity) => entity?.resource);
  }
}
