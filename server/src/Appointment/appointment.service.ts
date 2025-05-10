import { Injectable } from "@nestjs/common";
import type { Appointment, Bundle } from "fhir/r5";
import { wrapInBundle } from "src/utils/bundle";
// biome-ignore lint/style/useImportType: nestjs quirk
import { DataStoreService } from "../db/dataStore.service";

@Injectable()
export class AppointmentService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Appointment>> {
    return wrapInBundle(this.repo.appointments);
  }
}
