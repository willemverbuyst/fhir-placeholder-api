import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { EpisodesService } from './episodes.service';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodesService,
        { provide: DataStore, useValue: testDataStore },
      ],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all episodes', () => {
    const episodes = service.findAll();
    expect(episodes).toBeDefined();
    expect(episodes.length).toBe(2);
  });

  it('should return an episode by id', () => {
    const episode = service.findOne('1');
    expect(episode).toBeDefined();
    expect(episode!.id).toBe('1');
    expect(episode!.resourceType).toBe('EpisodeOfCare');
  });

  it("should return undefined for an episode that doesn't exist", () => {
    const episode = service.findOne('999');
    expect(episode).toBeUndefined();
  });

  it('should return episodes by patient id', () => {
    const episodes = service.findByPatientId('1');
    expect(episodes).toBeDefined();
    expect(episodes.length).toBe(1);
    expect(episodes[0].patient.reference).toBe('Patient/1');
  });

  it("should return an empty array for a patient id that doesn't exist", () => {
    const episodes = service.findByPatientId('999');
    expect(episodes).toBeDefined();
    expect(episodes.length).toBe(0);
  });
});
