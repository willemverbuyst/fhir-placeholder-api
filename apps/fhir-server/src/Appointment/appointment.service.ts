import { Injectable } from "@nestjs/common";
import type { Appointment as TAppointment, Bundle } from "fhir/r5";
import { wrapInBundle } from "../utils/bundle";
import { Appointment } from "./appointment.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
  ) {}

  async findAll(query?: { patient?: string }): Promise<Bundle<TAppointment>> {
    if (query?.patient) {
      const entities: { resource: TAppointment }[] = await this.repo.query(
        `SELECT * FROM appointment WHERE resource->'subject'->>'reference' = $1`,
        [`Patient/${query.patient}`],
      );
      const resources = entities.map((e) => e.resource);
      return wrapInBundle(resources);
    }

    const entities = await this.repo.find();
    const resources = entities.map((e) => e.resource);

    return wrapInBundle(resources);
  }
}
