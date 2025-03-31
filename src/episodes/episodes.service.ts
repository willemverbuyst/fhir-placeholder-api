import { Injectable } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly repo: DataStore) {}

  create(createEpisodeDto: CreateEpisodeDto) {
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

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
