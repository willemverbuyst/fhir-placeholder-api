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
    if (query?.patient && query?.encounter) {
      const entities: { resource: TCommunication }[] = await this.repo.query(
        `SELECT resource FROM communication WHERE resource->'subject'->>'reference' LIKE $1 AND resource->'encounter'->>'reference' LIKE $2`,
        [`Patient/${query.patient}`, `Encounter/${query.encounter}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.patient) {
      const entities: { resource: TCommunication }[] = await this.repo.query(
        `SELECT resource FROM communication WHERE resource->'subject'->>'reference' LIKE $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    if (query?.encounter) {
      const entities: { resource: TCommunication }[] = await this.repo.query(
        `SELECT resource FROM communication WHERE resource->'encounter'->>'reference' LIKE $1`,
        [`Encounter/${query.encounter}`],
      );
      const resources = entities.map((entity) => entity.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((entity) => entity.resource);
    return wrapInBundle(resources);
  }
}
