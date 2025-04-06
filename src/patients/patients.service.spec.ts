import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      const patients = await service.findAll();
      expect(patients).toBeDefined();
      expect(patients.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return an patient by id', async () => {
      const patient = await service.findOne('1');
      expect(patient).toBeDefined();

      if (!patient) {
        throw new Error('Expected patient to be defined in test');
      }

      expect(patient.id).toBe('1');
      expect(patient.resourceType).toBe('Patient');
    });

    it("should return undefined for an patient that doesn't exist", async () => {
      const patient = await service.findOne('unknown');
      expect(patient).toBeUndefined();
    });
  });

  describe('findAllEpisodesForPatient', () => {
    it('should return all episodes for a patient', async () => {
      const episodes = await service.findAllEpisodesForPatient('1');
      expect(episodes).toBeDefined();
      expect(episodes.length).toBe(1);
    });

    it("should return an empty array for a patient that doesn't exist", async () => {
      const episodes = await service.findAllEpisodesForPatient('unknown');
      expect(episodes).toBeDefined();
      expect(episodes.length).toBe(0);
    });
  });
});
