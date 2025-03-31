import { Injectable } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

@Injectable()
export class ConditionsService {
  constructor(private readonly repo: DataStore) {}

  create(createConditionDto: CreateConditionDto) {
    return 'This action adds a new condition';
  }

  findAll() {
    return this.repo.conditions;
  }

  findOne(id: number) {
    return this.repo.conditions.find(
      (condition) => condition.id === String(id),
    );
  }

  update(id: number, updateConditionDto: UpdateConditionDto) {
    return `This action updates a #${id} condition`;
  }

  remove(id: number) {
    return `This action removes a #${id} condition`;
  }
}
