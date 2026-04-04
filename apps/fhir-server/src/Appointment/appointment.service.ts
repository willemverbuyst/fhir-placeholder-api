import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { dummyDataConfig } from "@repo/config-scripts";
import type { Appointment as TAppointment, Bundle } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { Appointment } from "./appointment.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private repo: Repository<Appointment>,
  ) {}

  // async create(
  //   createAppointmentDto: CreateAppointmentDto,
  // ): Promise<TAppointment> {
  //   const patient = this.repo.patients.find(
  //     (p) => p.id === createAppointmentDto.subject,
  //   );

  //   if (!patient) {
  //     throw new NotFoundException("patient for appointment not found");
  //   }

  //   const generalPractitioner =
  //     patient?.generalPractitioner?.[0]?.reference?.split("/")[1];

  //   if (!generalPractitioner) {
  //     throw new UnprocessableEntityException(
  //       "missing general practitioner for patient",
  //     );
  //   }

  //   const newAppointment: TAppointment = {
  //     id:
  //       dummyDataConfig.idStrategy === "sequential"
  //         ? `appointment-${String(this.repo.appointments.length + 1)}`
  //         : crypto.randomUUID(),
  //     resourceType: "Appointment",
  //     subject: { reference: `Patient/${createAppointmentDto.subject}` },
  //     status: createAppointmentDto.status,
  //     participant: [
  //       {
  //         actor: {
  //           reference: `Patient/${createAppointmentDto.subject}`,
  //         },
  //         status: "tentative",
  //       },
  //       {
  //         actor: {
  //           reference: `Practitioner/${generalPractitioner}`,
  //         },
  //         status: "tentative",
  //       },
  //     ],
  //   };

  //   this.repo.appointments.push(newAppointment);

  //   return newAppointment;
  // }

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

    const resources = await this.repo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    return wrapInBundle(resources);
  }
}
