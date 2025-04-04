import { Injectable } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';

@Injectable()
export class PractitionersService {
  constructor(private readonly repo: DataStore) {}

  create() {
    return 'This action adds a new practitioner';
  }

  findAll() {
    return this.repo.practitioners;
  }

  findOne(id: string) {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === id,
    );
  }

  update(id: number) {
    return `This action updates a #${id} practitioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} practitioner`;
  }
}
