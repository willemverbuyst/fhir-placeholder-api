import { Injectable } from '@nestjs/common';
import { DataStoreService } from '../db/dataStore.service';

@Injectable()
export class PractitionerService {
  constructor(private readonly repo: DataStoreService) {}

  findAll() {
    return this.repo.practitioners;
  }

  async findOne(id: string) {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === id,
    );
  }
}
