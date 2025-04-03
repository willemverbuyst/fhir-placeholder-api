import { Injectable } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';

@Injectable()
export class ConditionsService {
  constructor(private readonly repo: DataStore) {}

  create() {
    return 'This action adds a new condition';
  }

  findAll() {
    return this.repo.conditions;
  }

  findOne(id: string) {
    return this.repo.conditions.find((condition) => condition.id === id);
  }

  update(id: number) {
    return `This action updates a #${id} condition`;
  }

  remove(id: number) {
    return `This action removes a #${id} condition`;
  }
}
