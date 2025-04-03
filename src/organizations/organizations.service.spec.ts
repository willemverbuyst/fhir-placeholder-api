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
        { provide: DataStore, useValue: testDataStore },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all organizations', () => {
    const organizations = service.findAll();
    expect(organizations).toBeDefined();
    expect(organizations.length).toBe(2);
  });

  it('should return an organization by id', async () => {
    const organization = await service.findOne('1');
    expect(organization).toBeDefined();
    expect(organization!.id).toBe('1');
    expect(organization!.resourceType).toBe('Organization');
  });

  it("should return undefined for an organization that doesn't exist", async () => {
    const organization = await service.findOne('unknown');
    expect(organization).toBeUndefined();
  });
});
