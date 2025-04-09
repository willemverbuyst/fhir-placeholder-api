import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Practitioner } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PractitionerController } from './practitioner.controller';
import { PractitionerService } from './practitioner.service';

describe('PractitionerController', () => {
  let controller: PractitionerController;
  let service: PractitionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PractitionerController],
      providers: [
        {
          provide: PractitionerService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        { provide: DataStoreService, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<PractitionerController>(PractitionerController);
    service = module.get<PractitionerService>(PractitionerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of PractitionerService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of PractitionerService', async () => {
      const mockPractitioner: Practitioner = {
        id: '1',
        resourceType: 'Practitioner',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPractitioner);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockPractitioner);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if practitioner with id is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne('unknown')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith('unknown');
    });
  });
});
