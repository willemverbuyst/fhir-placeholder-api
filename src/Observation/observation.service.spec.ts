import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { ObservationService } from './observation.service';

describe('ObservationService', () => {
  let service: ObservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObservationService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<ObservationService>(ObservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all observations', async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(5);
    });
  });
});
