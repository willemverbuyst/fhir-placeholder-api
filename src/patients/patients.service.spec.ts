import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        { provide: DataStore, useValue: testDataStore },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all patients', () => {
    const patients = service.findAll();
    expect(patients).toBeDefined();
    expect(patients.length).toBe(2);
  });

  it('should return an patient by id', () => {
    const patient = service.findOne('1');
    expect(patient).toBeDefined();
    expect(patient!.id).toBe('1');
    expect(patient!.resourceType).toBe('Patient');
  });
});
