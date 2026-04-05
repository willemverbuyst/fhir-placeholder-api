import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import type { Bundle, Patient as TPatient } from "fhir/r5";
import { Repository } from "typeorm/repository/Repository";
import { wrapInBundle } from "../utils/bundle";
import { Patient } from "./patient.entity";

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
    if (query?.organization) {
      const entities: { resource: TPatient }[] = await this.repo.query(
        `SELECT resource FROM patient WHERE resource->'managingOrganization'->>'reference' LIKE $1`,
        [`Organization/${query.organization}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.["general-practitioner"]) {
      const entities: { resource: TPatient }[] = await this.repo.query(
        "SELECT resource FROM patient WHERE resource->'generalPractitioner' @> $1",
        [`[{"reference": "Practitioner/${query["general-practitioner"]}"}]`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<TPatient | undefined> {
    const entity = await this.repo.findOneBy({ id });
    const resource = entity?.resource;
    return resource;
  }
}
