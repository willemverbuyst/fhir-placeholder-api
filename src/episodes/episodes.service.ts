import { Injectable } from '@nestjs/common';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class EpisodesService {
  constructor(private readonly repo: DataStoreService) {}

  async findAll() {
    return this.repo.episodes;
  }

  async findOne(id: string) {
    return this.repo.episodes.find((episode) => episode.id === id);
  }

  async findByPatientId(id: string) {
    return this.repo.episodes.filter(
      (e) => e.patient.reference?.split('/')[1] === id,
    );
  }
}
