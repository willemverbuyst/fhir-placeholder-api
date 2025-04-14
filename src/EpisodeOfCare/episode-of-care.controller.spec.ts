import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeOfCare } from 'fhir/r5';
import { Id } from 'src/types';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { EpisodeOfCareController } from './episode-of-care.controller';
import { EpisodeOfCareService } from './episode-of-care.service';

describe('EpisodeOfCareController', () => {
  let controller: EpisodeOfCareController;
  let service: EpisodeOfCareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodeOfCareController],
      providers: [
        {
          provide: EpisodeOfCareService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        { provide: DataStoreService, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<EpisodeOfCareController>(EpisodeOfCareController);
    service = module.get<EpisodeOfCareService>(EpisodeOfCareService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of EpisodeOfCareService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should call findAll method of EpisodeOfCareService', async () => {
      const mockEpisode: EpisodeOfCare & Id = {
        id: '1',
        resourceType: 'EpisodeOfCare',
        status: 'active',
        patient: {
          reference: 'Patient/1',
        },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEpisode);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockEpisode);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an error if episode with id is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne('unknown')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith('unknown');
    });
  });
});
