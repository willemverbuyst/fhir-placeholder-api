import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Practitioner } from 'fhir/r5';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { PractitionersController } from './practitioners.controller';
import { PractitionersService } from './practitioners.service';

describe('PractitionersController', () => {
  let controller: PractitionersController;
  let service: PractitionersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PractitionersController],
      providers: [
        {
          provide: PractitionersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        { provide: DataStore, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<PractitionersController>(PractitionersController);
    service = module.get<PractitionersService>(PractitionersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of PractitionersService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of PractitionersService', async () => {
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

  describe('remove', () => {
    it('should call remove method of PractitionersService', async () => {
      const mockPractitioner: Practitioner = {
        id: '1',
        resourceType: 'Practitioner',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(mockPractitioner);

      const result = await controller.remove('1');
      expect(result).toEqual(mockPractitioner);
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw an error if practitioner with id is not found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove('unknown')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith('unknown');
    });
  });
});
