import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Organization } from 'fhir/r5';
import { DataStoreService } from '../db/dataStore.service';
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
            findByName: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        { provide: DataStoreService, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll method of OrganizationsService', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array of organizations with name', async () => {
      const mockOrganizations: Organization[] = [
        {
          id: '1',
          resourceType: 'Organization',
          name: 'foo',
        },
      ];
      jest.spyOn(service, 'findByName').mockResolvedValue(mockOrganizations);
      const result = await controller.findAll({ name: 'foo' });
      expect(result).toEqual(mockOrganizations);
    });
  });

  describe('findOne', () => {
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
  });

  describe('create', () => {
    it('should call create with organization dto', async () => {
      const dto = { name: 'test organization' };
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('remove', () => {
    it('should call remove method of OrganizationsService', async () => {
      const mockOrganization: Organization = {
        id: '1',
        resourceType: 'Organization',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(mockOrganization);
      const result = await controller.remove('1');
      expect(result).toEqual(mockOrganization);
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw an error if organization with id is not found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove('unknown')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith('unknown');
    });
  });

  describe('update', () => {
    it('should call update method of OrganizationsService', async () => {
      const mockOrganization: Organization = {
        id: '1',
        resourceType: 'Organization',
      };
      const dto = { name: 'Updated organization' };
      jest.spyOn(service, 'update').mockResolvedValue(mockOrganization);
      const result = await controller.update('1', dto);
      expect(result).toEqual(mockOrganization);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });

    it('should throw an error if organization with id is not found', async () => {
      const dto = { name: 'updated organization' };
      jest.spyOn(service, 'update').mockResolvedValue(undefined);

      await expect(controller.update('unknown', dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith('unknown', dto);
    });
  });
});
