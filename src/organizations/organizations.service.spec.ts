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
});
