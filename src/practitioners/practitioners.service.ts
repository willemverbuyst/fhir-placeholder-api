import { Injectable } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';

@Injectable()
export class PractitionersService {
  constructor(private readonly repo: DataStore) {}

  findAll() {
    return this.repo.practitioners;
  }

  async findOne(id: string) {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === id,
    );
  }

  async remove(id: string) {
    const practitioner = await this.findOne(id);

    if (practitioner) {
      this.repo.practitioners = this.repo.practitioners.filter(
        (practitioner) => practitioner.id !== id,
      );
      return practitioner;
    }
    return undefined;
  }
}
