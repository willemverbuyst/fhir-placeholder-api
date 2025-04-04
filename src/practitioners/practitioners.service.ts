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

  async findOne(id: string) {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === id,
    );
  }

  update(id: number) {
    return `This action updates a #${id} practitioner`;
  }

  remove(id: string) {
    const practitioner = this.findOne(id);

    if (practitioner) {
      this.repo.practitioners = this.repo.practitioners.filter(
        (practitioner) => practitioner.id !== id,
      );
      return practitioner;
    }
    return undefined;
  }
}
