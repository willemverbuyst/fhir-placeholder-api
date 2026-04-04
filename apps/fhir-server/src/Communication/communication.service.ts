import { Injectable } from "@nestjs/common";
import type { Bundle, Communication as TCommunication } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Communication } from "./communication.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

type FindAllQuery = {
  patient?: string;
  encounter?: string;
};

@Injectable()
export class CommunicationService {
  constructor(
    @InjectRepository(Communication)
    private repo: Repository<Communication>,
  ) {}

  async findAll(query?: FindAllQuery): Promise<Bundle<TCommunication>> {
    // let resources = this.repo.communications;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient, encounter } = query;

    // if (patient && encounter) {
    //   resources = resources.filter(
    //     (communication) =>
    //       communication.subject?.reference?.endsWith(patient) &&
    //       communication.encounter?.reference?.endsWith(encounter),
    //   );
    // } else if (patient) {
    //   resources = resources.filter((communication) =>
    //     communication.subject?.reference?.endsWith(patient),
    //   );
    // } else if (encounter) {
    //   resources = resources.filter((communication) =>
    //     communication.encounter?.reference?.endsWith(encounter),
    //   );
    // }
    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
