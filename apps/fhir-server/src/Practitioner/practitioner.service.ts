import { Injectable } from "@nestjs/common";
import type { Bundle, Practitioner as TPractitioner } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import type { GetPractitionerDto } from "./dto/get-practitioner.dto";
import { Practitioner } from "./practitioner.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PractitionerService {
  constructor(
    @InjectRepository(Practitioner)
    private repo: Repository<Practitioner>,
  ) {}

  async findAll(query?: GetPractitionerDto): Promise<Bundle<TPractitioner>> {
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
