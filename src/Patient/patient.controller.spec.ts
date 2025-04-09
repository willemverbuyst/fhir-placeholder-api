import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Patient } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            findAll: jest.fn(),
            findAllEpisodesForPatient: jest.fn(),
            findOne: jest.fn(),
          },
        },
        { provide: DataStoreService, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of PatientService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllEpisodesForPatient', () => {
    it('should call findAllEpisodesForPatient method of PatientService', () => {
      const id = '1';
      controller.findAllEpisodesForPatient(id);
      expect(service.findAllEpisodesForPatient).toHaveBeenCalledWith(id);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of PatientService', async () => {
      const mockPatient: Patient = {
        id: '1',
        resourceType: 'Patient',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPatient);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockPatient);
    });

    it('should throw an error if patient with id is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);
      await expect(controller.findOne('1')).rejects.toThrow(
        new NotFoundException('patient not found'),
      );
    });
  });
});
