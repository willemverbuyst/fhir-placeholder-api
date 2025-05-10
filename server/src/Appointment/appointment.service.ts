import { Injectable } from "@nestjs/common";
import type { Appointment, Bundle } from "fhir/r5";
import type { Id } from "src/types";
import { wrapInBundle } from "src/utils/bundle";
// biome-ignore lint/style/useImportType: nestjs quirk
import { DataStoreService } from "../db/dataStore.service";

@Injectable()
export class AppointmentService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: { patient?: string }): Promise<
    Bundle<Appointment & Id>
  > {
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
