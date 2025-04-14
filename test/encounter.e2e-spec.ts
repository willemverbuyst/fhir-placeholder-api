import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataStoreService } from '../src/db/dataStore.service';
import { testDataStore } from '../src/test/testDataStore';

describe('EncounterController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataStoreService)
      .useValue({ ...testDataStore })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/Encounter (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Encounter')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(5);
      });
  });

  it('/Encounter?patient=2 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Encounter?patient=2')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(4);
      });
  });

  it('/Encounter?episode-of-care=2 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Encounter?episode-of-care=2')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(1);
      });
  });

  it('/Encounter?patient=2&episode-of-care=2 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Encounter?patient=2&episode-of-care=2')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(1);
      });
  });
});
