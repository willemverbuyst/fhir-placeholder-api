import { Injectable } from "@nestjs/common";
import type { Bundle, Patient as TPatient } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Patient } from "./patient.entity";
import { Repository } from "typeorm/repository/Repository";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repo: Repository<Patient>,
  ) {}

  async findAll(query?: {
    organization?: string;
    "general-practitioner"?: string;
  }): Promise<Bundle<TPatient>> {
    // let resources = this.repo.patients;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { organization, "general-practitioner": generalPractitioner } = query;

    // if (organization) {
    //   resources = resources.filter((p) =>
    //     p.managingOrganization?.reference?.endsWith(organization),
    //   );
    // }

    // if (generalPractitioner) {
    //   resources = resources.filter((p) =>
    //     p.generalPractitioner?.some((g) =>
    //       g.reference?.endsWith(generalPractitioner),
    //     ),
    //   );
    // }

    if (query?.organization) {
      const resources: { resource: TPatient }[] = await this.repo.query(
        `SELECT resource FROM patient WHERE resource->'managingOrganization'->>'reference' LIKE $1`,
        [`%${query.organization}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    if (query?.["general-practitioner"]) {
      const resources: { resource: TPatient }[] = await this.repo.query(
        "SELECT resource FROM patient WHERE resource->'generalPractitioner' @> $1",
        [`[{"reference": "Practitioner/${query["general-practitioner"]}"}]`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TPatient | undefined> {
    return await this.repo.findOneBy({ id }).then((entity) => entity?.resource);
    // return this.repo.patients.find((patient) => patient.id === id);
  }
}
