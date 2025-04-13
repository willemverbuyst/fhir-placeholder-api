import { Injectable } from '@nestjs/common';
import { Bundle, EpisodeOfCare, Patient } from 'fhir/r5';
import { Id } from 'src/types';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class PatientService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll(): Promise<Bundle<Patient & Id>> {
    const resources = this.repo.patients;
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: resources.length,
      entry: resources.map((resource) => ({
        fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
        resource,
      })),
    };
  }

  async findOne(id: string): Promise<(Patient & Id) | undefined> {
    return this.repo.patients.find((patient) => patient.id === id);
  }

  async findAllEpisodesForPatient(id: string): Promise<Bundle<EpisodeOfCare>> {
    const resources = this.repo.episodes.filter(
      (episode) => episode.patient.reference?.split('/')[1] === id,
    );
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: resources.length,
      entry: resources.map((resource) => ({
        fullUrl: `http://localhost:8080/api/v2/r5/${resource.resourceType}/${resource.id}`,
        resource,
      })),
    };
  }
}
