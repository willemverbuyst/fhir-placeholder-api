import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import type { Appointment, Bundle } from "fhir/r5";
import { DataStoreService } from "../db/dataStore.service";
import { wrapInBundle } from "../utils/bundle";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@Injectable()
export class AppointmentService {
  constructor(private readonly repo: DataStoreService) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const patient = this.repo.patients.find(
      (p) => p.id === createAppointmentDto.subject,
    );

    if (!patient) {
      throw new NotFoundException("patient for appointment not found");
    }

    const generalPractitioner =
      patient?.generalPractitioner?.[0]?.reference?.split("/")[1];

    if (!generalPractitioner) {
      throw new UnprocessableEntityException(
        "missing general practitioner for patient",
      );
    }

    const newAppointment: Appointment = {
      id: `appointment-${String(this.repo.appointments.length + 1)}`,
      resourceType: "Appointment",
      subject: { reference: `Patient/${createAppointmentDto.subject}` },
      status: createAppointmentDto.status,
      participant: [
        {
          actor: {
            reference: `Patient/${createAppointmentDto.subject}`,
          },
          status: "tentative",
        },
        {
          actor: {
            reference: `Practitioner/${generalPractitioner}`,
          },
          status: "tentative",
        },
      ],
    };

    this.repo.appointments.push(newAppointment);

    return newAppointment;
  }

  async findAll(query?: { patient?: string }): Promise<Bundle<Appointment>> {
    let resources = this.repo.appointments;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { patient } = query;

    if (patient) {
      resources = resources.filter((e) =>
        e.subject?.reference?.endsWith(patient),
      );
    }

    return wrapInBundle(resources);
  }
}
