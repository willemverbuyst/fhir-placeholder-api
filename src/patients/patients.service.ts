import { Injectable } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';

@Injectable()
export class PatientsService {
  constructor(private readonly repo: DataStore) {}

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
