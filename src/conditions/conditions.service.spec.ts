import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { ConditionsService } from './conditions.service';

describe('ConditionsService', () => {
  let service: ConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConditionsService,
        { provide: DataStore, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<ConditionsService>(ConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all conditions', () => {
    const conditions = service.findAll();
    expect(conditions).toBeDefined();
    expect(conditions.length).toBe(2);
  });

  it('should return an condition by id', () => {
    const condition = service.findOne('1');
    expect(condition).toBeDefined();

    if (!condition) {
      throw new Error('Expected condition to be defined in test');
    }

    expect(condition.id).toBe('1');
    expect(condition.resourceType).toBe('Condition');
  });

  it("should return undefined for an condition that doesn't exist", () => {
    const condition = service.findOne('999');
    expect(condition).toBeUndefined();
  });
});
