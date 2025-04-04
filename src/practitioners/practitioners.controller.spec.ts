import { Test, TestingModule } from '@nestjs/testing';
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
    it('should call findOne method of PractitionersService', () => {
      const id = '1';
      controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should call remove method of PractitionersService', () => {
      const id = '1';
      controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
