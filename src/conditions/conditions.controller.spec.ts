import { Test, TestingModule } from '@nestjs/testing';
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

  it('should call findAll method of ConditionsService', () => {
    controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call findOne method of ConditionsService', () => {
    const id = '1';
    controller.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
  });
});
