import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        {
          provide: OrganizationsService,
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

    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll method of OrganizationsService', () => {
    controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call findOne method of OrganizationsService', () => {
    const id = '1';
    controller.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call create with organization dto', () => {
    const body = { name: 'test organization' };
    controller.create(body);

    expect(service.create).toHaveBeenCalledWith(body);
  });
});
