import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PractitionersService } from './practitioners.service';

describe('PractitionersService', () => {
  let service: PractitionersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PractitionersService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<PractitionersService>(PractitionersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all practitioners', () => {
      const practitioners = service.findAll();
      expect(practitioners).toBeDefined();
      expect(practitioners.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return an practitioner by id', async () => {
      const practitioner = await service.findOne('1');
      expect(practitioner).toBeDefined();

      if (!practitioner) {
        throw new Error('Expected practitioner to be defined in test');
      }

      expect(practitioner.id).toBe('1');
      expect(practitioner.resourceType).toBe('Practitioner');
    });

    it("should return undefined for an practitioner that doesn't exist", async () => {
      const practitioner = await service.findOne('999');
      expect(practitioner).toBeUndefined();
    });
  });
});
