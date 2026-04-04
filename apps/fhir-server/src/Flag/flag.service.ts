import { Injectable } from "@nestjs/common";
import type { Bundle, Flag as TFlag } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Flag } from "./flag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

type FindAllFlagQuery = {
  patient?: string;
  encounter?: string;
};

@Injectable()
export class FlagService {
  constructor(
    @InjectRepository(Flag)
    private repo: Repository<Flag>,
  ) {}

  async findAll(query?: FindAllFlagQuery): Promise<Bundle<TFlag>> {
    // let resources = this.repo.flags;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient, encounter } = query;

    // if (patient && encounter) {
    //   resources = this.repo.flags.filter(
    //     (flag) =>
    //       flag.subject?.reference?.endsWith(patient) &&
    //       flag.encounter?.reference?.endsWith(encounter),
    //   );
    // } else if (patient) {
    //   resources = this.repo.flags.filter((flag) =>
    //     flag.subject?.reference?.endsWith(patient),
    //   );
    // } else if (encounter) {
    //   resources = this.repo.flags.filter((flag) =>
    //     flag.encounter?.reference?.endsWith(encounter),
    //   );
    // }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
