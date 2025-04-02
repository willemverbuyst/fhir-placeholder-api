import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [
        {
          provide: EpisodesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByPatientId: jest.fn(),
          },
        },
        { provide: DataStore, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll method of EpisodesService', () => {
    controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call findAll method of EpisodesService', () => {
    controller.findAll('patientId');

    expect(service.findByPatientId).toHaveBeenCalledTimes(1);
  });

  it('should call findOne method of EpisodesService', () => {
    const id = '1';
    controller.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
  });
});
