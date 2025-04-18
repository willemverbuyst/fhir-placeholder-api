import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { PractitionerRoleService } from './practitioner-role.service';

describe('PractitionerRoleService', () => {
  let service: PractitionerRoleService;
  const mockDataStore = {
    practitionerRoles: [
      {
        id: '1',
        resourceType: 'PractitionerRole',
      },
      {
        id: '2',
        resourceType: 'PractitionerRole',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PractitionerRoleService,
        { provide: DataStoreService, useValue: mockDataStore },
      ],
    }).compile();

    service = module.get<PractitionerRoleService>(PractitionerRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all practitioner roles', async () => {
      const bundle = await service.findAll();
      expect(bundle).toBeDefined();
      expect(bundle.entry?.length).toBe(2);
    });
  });
});
