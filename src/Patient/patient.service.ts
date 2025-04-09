import { Injectable } from '@nestjs/common';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class PatientService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll() {
    return this.repo.patients;
  }

  async findOne(id: string) {
    return this.repo.patients.find((patient) => patient.id === id);
  }

  async findAllEpisodesForPatient(id: string) {
    return this.repo.episodes.filter(
      (episode) => episode.patient.reference?.split('/')[1] === id,
    );
  }
}
