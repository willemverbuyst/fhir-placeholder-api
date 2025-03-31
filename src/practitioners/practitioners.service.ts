import { Injectable } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';

@Injectable()
export class PractitionersService {
  constructor(private readonly repo: DataStore) {}

  create(createPractitionerDto: CreatePractitionerDto) {
    return 'This action adds a new practitioner';
  }

  findAll() {
    return this.repo.practitioners;
  }

  findOne(id: number) {
    return this.repo.practitioners.find(
      (practitioner) => practitioner.id === String(id),
    );
  }

  update(id: number, updatePractitionerDto: UpdatePractitionerDto) {
    return `This action updates a #${id} practitioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} practitioner`;
  }
}
