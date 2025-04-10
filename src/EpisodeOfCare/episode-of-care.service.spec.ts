import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { EpisodeOfCareService } from './episode-of-care.service';

describe('EpisodeOfCareService', () => {
  let service: EpisodeOfCareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeOfCareService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<EpisodeOfCareService>(EpisodeOfCareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all episodes in a Bundle', async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(3);
    });
  });

  describe('findOne', () => {
    it('should return an episode by id', async () => {
      const episode = await service.findOne('1');
      expect(episode).toBeDefined();

      if (!episode) {
        throw new Error('Expected episode to be defined in test');
      }
      expect(episode.id).toBe('1');
      expect(episode.resourceType).toBe('EpisodeOfCare');
    });

    it("should return undefined for an episode that doesn't exist", async () => {
      const episode = await service.findOne('unknown');
      expect(episode).toBeUndefined();
    });
  });

  describe('findByPatientId', () => {
    it('should return episodes by patient id', async () => {
      const bundle = await service.findByPatientId('1');
      expect(bundle).toBeDefined();

      if (!bundle.entry) {
        throw new Error('Expected entry to be defined in bundle');
      }
      expect(bundle.entry.length).toBe(2);

      expect(bundle.entry[0].resource?.patient.reference).toBe('Patient/1');
      expect(bundle.entry[1].resource?.patient.reference).toBe('Patient/1');
    });

    it("should return an empty array for a patient id that doesn't exist", async () => {
      const bundle = await service.findByPatientId('unknown');
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(0);
    });
  });
});
