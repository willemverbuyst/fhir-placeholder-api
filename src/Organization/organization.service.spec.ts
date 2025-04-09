import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        { provide: DataStoreService, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all organizations', async () => {
      const organizations = await service.findAll();
      expect(organizations).toBeDefined();
      expect(organizations.length).toBe(3);
    });
  });

  describe('findOne', () => {
    it('should return an organization by id', async () => {
      const organization = await service.findOne('1');
      expect(organization).toBeDefined();

      if (!organization) {
        throw new Error('Expected organization to be defined in test');
      }

      expect(organization.id).toBe('1');
      expect(organization.resourceType).toBe('Organization');
    });

    it("should return undefined for an organization that doesn't exist", async () => {
      const organization = await service.findOne('unknown');
      expect(organization).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new organization', async () => {
      const newOrganization = await service.create({
        name: 'New Organization',
      });
      expect(newOrganization).toBeDefined();
      expect(newOrganization.id).toBeDefined();
      expect(newOrganization.resourceType).toBe('Organization');
      expect(newOrganization.name).toBe('New Organization');
      expect(newOrganization.active).toBe(true);

      const allOrganizations = await service.findAll();
      expect(allOrganizations.length).toBe(4);
    });
  });

  describe('update', () => {
    it('should update an existing organization', async () => {
      const updatedOrganization = await service.update('1', {
        name: 'Updated Organization',
      });
      expect(updatedOrganization).toBeDefined();

      if (!updatedOrganization) {
        throw new Error('Expected updated organization to be defined in test');
      }

      expect(updatedOrganization.id).toBe('1');
      expect(updatedOrganization.resourceType).toBe('Organization');
      expect(updatedOrganization.name).toBe('Updated Organization');
    });

    it("should return undefined for an organization that doesn't exist", async () => {
      const updatedOrganization = await service.update('unknown', {
        name: 'Updated Organization',
      });
      expect(updatedOrganization).toBeUndefined();
    });
  });

  describe('findByName', () => {
    it('should return organization with given name', async () => {
      const organizations = await service.findByName('test organization');
      expect(organizations).toBeDefined();

      if (!organizations) {
        throw new Error('Expected organizations to be defined');
      }

      expect(organizations[0]).toHaveProperty('name', 'test organization');
    });

    it('should return multiple organizations for given name', async () => {
      const organizations = await service.findByName('test organization');
      expect(organizations).toBeDefined();

      if (!organizations) {
        throw new Error('Expected organizations to be defined');
      }

      expect(organizations.length).toBe(2);
      expect(organizations[0]).toHaveProperty('resourceType', 'Organization');
      expect(organizations[0]).toHaveProperty('id', '1');
      expect(organizations[1]).toHaveProperty('resourceType', 'Organization');
      expect(organizations[1]).toHaveProperty('id', '3');
    });

    it('should return an empty array when no organizations with given name are found', async () => {
      const organizations = await service.findByName('unknown organization');
      expect(organizations).toBeDefined();

      if (!organizations) {
        throw new Error('Expected organizations to be defined');
      }

      expect(organizations.length).toBe(0);
    });
  });
});
