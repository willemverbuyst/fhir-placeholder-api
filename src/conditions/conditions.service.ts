import { Injectable } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';

@Injectable()
export class ConditionsService {
  constructor(private readonly repo: DataStore) {}

  async findAll() {
    return this.repo.conditions;
  }

  async findOne(id: string) {
    return this.repo.conditions.find((condition) => condition.id === id);
  }
}
