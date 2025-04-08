import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeOfCare } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
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
            findByPatientId: jest.fn(),
          },
        },
        { provide: DataStoreService, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of EpisodesService', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array of episodes for patient', async () => {
      const mockEpisodes: EpisodeOfCare[] = [
        {
          id: '1',
          resourceType: 'EpisodeOfCare',
          status: 'active',
          patient: {
            reference: 'Patient/1',
          },
        },
      ];
      jest.spyOn(service, 'findByPatientId').mockResolvedValue(mockEpisodes);
      const result = await controller.findAll({ patient: '1' });
      expect(result).toEqual(mockEpisodes);
    });
  });

  describe('findOne', () => {
    it('should call findAll method of EpisodesService', async () => {
      const mockEpisode: EpisodeOfCare = {
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
