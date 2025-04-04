import { Test, TestingModule } from '@nestjs/testing';
import { DataStore } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: DataStore, useValue: { ...testDataStore } },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all organizations', () => {
      const organizations = service.findAll();
      expect(organizations).toBeDefined();
      expect(organizations.length).toBe(2);
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

  describe('remove', () => {
    it("should return undefined for an organization that doesn't exist", async () => {
      const organization = await service.remove('unknown');
      expect(organization).toBeUndefined();
    });

    it('should remove an organization by id', async () => {
      const organization = await service.remove('1');
      expect(organization).toBeDefined();

      if (!organization) {
        throw new Error('Expected organization to be defined in test');
      }

      expect(organization.id).toBe('1');
      expect(organization.resourceType).toBe('Organization');

      const allOrganizations = service.findAll();
      expect(allOrganizations.length).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a new organization', () => {
      const newOrganization = service.create({
        name: 'New Organization',
      });
      expect(newOrganization).toBeDefined();
      expect(newOrganization.id).toBeDefined();
      expect(newOrganization.resourceType).toBe('Organization');
      expect(newOrganization.name).toBe('New Organization');
      expect(newOrganization.active).toBe(true);

      const allOrganizations = service.findAll();
      expect(allOrganizations.length).toBe(3);
    });
  });
});
