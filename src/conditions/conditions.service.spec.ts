import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { ConditionsService } from './conditions.service';

describe('ConditionsService', () => {
  let service: ConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionsService, DataStore],
    }).compile();

    service = module.get<ConditionsService>(ConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
