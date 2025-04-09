import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
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
      const bundle = await service.findAllEpisodesForPatient('1');
      expect(bundle).toBeDefined();

      if (!bundle.entry) {
        throw new Error('Expected entry to be defined in bundle');
      }
      expect(bundle.entry?.length).toBe(2);

      expect(bundle.entry[0].resource?.patient.reference).toBe('Patient/1');
      expect(bundle.entry[1].resource?.patient.reference).toBe('Patient/1');
    });

    it("should return an empty array for a patient that doesn't exist", async () => {
      const bundle = await service.findAllEpisodesForPatient('unknown');
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(0);
    });
  });
});
