import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Organization } from 'fhir/r5';
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

  it('should call findOne method of OrganizationsService', async () => {
    const mockOrganization: Organization = {
      id: '1',
      resourceType: 'Organization',
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(mockOrganization);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockOrganization);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw an error if organization with id is not found', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

    await expect(controller.findOne('unknown')).rejects.toThrow(
      NotFoundException,
    );
    expect(service.findOne).toHaveBeenCalledWith('unknown');
  });

  it('should call create with organization dto', () => {
    const dto = { name: 'test organization' };
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
