import { Test, TestingModule } from '@nestjs/testing';
import { DataStoreService } from '../db/dataStore.service';
import { testDataStore } from '../test/testDataStore';
import { EncounterController } from './encounter.controller';
import { EncounterService } from './encounter.service';

describe('EncounterController', () => {
  let controller: EncounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncounterController],
      providers: [
        EncounterService,
        { provide: DataStoreService, useValue: testDataStore },
      ],
    }).compile();

    controller = module.get<EncounterController>(EncounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
