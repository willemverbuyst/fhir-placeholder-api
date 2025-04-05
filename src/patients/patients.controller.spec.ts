import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Patient } from 'fhir/r5';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            findAllEpisodesForPatient: jest.fn(),
          },
        },
        { provide: DataStore, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of PatientsService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllEpisodesForPatient', () => {
    it('should call findAllEpisodesForPatient method of PatientsService', () => {
      const id = '1';
      controller.findAllEpisodesForPatient(id);
      expect(service.findAllEpisodesForPatient).toHaveBeenCalledWith(id);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of PatientsService', async () => {
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
