import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { EncounterService } from './encounter.service';

describe('EncounterService', () => {
  let service: EncounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncounterService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<EncounterService>(EncounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all encounters', async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(5);
    });
  });
});
