import { Injectable } from "@nestjs/common";
import type { Bundle, Observation as TObservation } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Observation } from "./observation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private repo: Repository<Observation>,
  ) {}

  async findAll(query?: {
    patient?: string;
    encounter?: string;
  }): Promise<Bundle<TObservation>> {
    // let resources = this.repo.observations;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient, encounter } = query;

    // if (patient && encounter) {
    //   resources = this.repo.observations.filter(
    //     (o) =>
    //       o.subject?.reference?.endsWith(patient) &&
    //       o.encounter?.reference?.endsWith(encounter),
    //   );
    // } else if (patient) {
    //   resources = this.repo.observations.filter((o) =>
    //     o.subject?.reference?.endsWith(patient),
    //   );
    // } else if (encounter) {
    //   resources = this.repo.observations.filter((o) =>
    //     o.encounter?.reference?.endsWith(encounter),
    //   );
    // }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
