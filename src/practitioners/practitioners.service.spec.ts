import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { PractitionersService } from './practitioners.service';

describe('PractitionersService', () => {
  let service: PractitionersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PractitionersService, DataStore],
    }).compile();

    service = module.get<PractitionersService>(PractitionersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
