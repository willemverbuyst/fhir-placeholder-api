import { Injectable } from "@nestjs/common";
import type { Bundle, Patient } from "fhir/r5";
import type { DataStoreService } from "../db/dataStore.service";
import type { Id } from "../types";
import { wrapInBundle } from "../utils/bundle";

@Injectable()
export class PatientService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(query?: {
    organization?: string;
    "general-practitioner"?: string;
  }): Promise<Bundle<Patient & Id>> {
    let resources = this.repo.patients;

    if (!query) {
      return wrapInBundle(resources);
    }

    const { organization, "general-practitioner": generalPractitioner } = query;

    if (organization) {
      resources = resources.filter((p) =>
        p.managingOrganization?.reference?.endsWith(organization),
      );
    }

    if (generalPractitioner) {
      resources = resources.filter((p) =>
        p.generalPractitioner?.some((g) =>
          g.reference?.endsWith(generalPractitioner),
        ),
      );
    }

    return wrapInBundle(resources);
  }

  async findOne(id: string): Promise<(Patient & Id) | undefined> {
    return this.repo.patients.find((patient) => patient.id === id);
  }
}
