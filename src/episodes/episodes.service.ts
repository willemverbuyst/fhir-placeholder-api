import { Injectable } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';

@Injectable()
export class EpisodesService {
  constructor(private readonly repo: DataStore) {}

  create() {
    return 'This action adds a new episode';
  }

  findAll() {
    return this.repo.episodes;
  }

  findOne(id: string) {
    return this.repo.episodes.find((episode) => episode.id === id);
  }

  findByPatientId(id: string) {
    return this.repo.episodes.filter(
      (e) => e.patient.reference?.split('/')[1] === id,
    );
  }

  update(id: number) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
