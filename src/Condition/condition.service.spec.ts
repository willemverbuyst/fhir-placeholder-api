import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { ConditionService } from './condition.service';

describe('ConditionService', () => {
  let service: ConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConditionService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<ConditionService>(ConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all conditions in a Bundle', async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });

    it('should return all conditions filtered by patient', async () => {
      const bundle = await service.findAll({ patient: '1' });
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return an condition by id', async () => {
      const condition = await service.findOne('1');
      expect(condition).toBeDefined();

      if (!condition) {
        throw new Error('Expected condition to be defined in test');
      }

      expect(condition.id).toBe('1');
      expect(condition.resourceType).toBe('Condition');
    });

    it("should return undefined for an condition that doesn't exist", async () => {
      const condition = await service.findOne('unknown');
      expect(condition).toBeUndefined();
    });
  });
});
