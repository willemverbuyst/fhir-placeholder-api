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
    it('should return all episodes', async () => {
      const episodes = await service.findAll();
      expect(episodes).toBeDefined();
      expect(episodes.length).toBe(3);
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
      const episodes = await service.findByPatientId('1');
      expect(episodes).toBeDefined();
      expect(episodes.length).toBe(2);
      expect(episodes[0].patient.reference).toBe('Patient/1');
      expect(episodes[1].patient.reference).toBe('Patient/1');
    });

    it("should return an empty array for a patient id that doesn't exist", async () => {
      const episodes = await service.findByPatientId('unknown');
      expect(episodes).toBeDefined();
      expect(episodes.length).toBe(0);
    });
  });
});
