import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Condition } from 'fhir/r5';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';

describe('ConditionsController', () => {
  let controller: ConditionsController;
  let service: ConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionsController],
      providers: [
        {
          provide: ConditionsService,
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

    controller = module.get<ConditionsController>(ConditionsController);
    service = module.get<ConditionsService>(ConditionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of ConditionsService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of ConditionsService', async () => {
      const mockCondition: Condition = {
        id: '1',
        resourceType: 'Condition',
        clinicalStatus: {},
        subject: {},
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCondition);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockCondition);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if condition with id is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne('unknown')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith('unknown');
    });
  });
});
