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
    // let resources = this.repo.appointments;

    // if (!query) {
    //   return wrapInBundle(resources);
    // }

    // const { patient } = query;

    // if (patient) {
    //   resources = resources.filter((e) =>
    //     e.subject?.reference?.endsWith(patient),
    //   );
    // }

    if (query?.patient) {
      const resources: { resource: TAppointment }[] = await this.repo.query(
        `SELECT * FROM appointment WHERE resource->'subject'->>'reference' = $1`,
        [`Patient/${query.patient}`],
      );
      return wrapInBundle(resources.map((r) => r.resource));
    }

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
