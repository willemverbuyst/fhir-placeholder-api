import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataStoreService } from '../src/db/dataStore.service';
import { testDataStore } from '../src/test/testDataStore';

describe('PractitionerController (e2e)', () => {
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

  it('/Practitioner (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Practitioner')
      .expect(200)
      .then((res) => {
        const practitioners = res.body;
        expect(practitioners).toBeDefined();
        expect(practitioners).toHaveProperty('resourceType', 'Bundle');
        expect(practitioners.entry).toHaveLength(2);
      });
  });

  it('/Practitioner/:id (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Practitioner/1')
      .expect(200)
      .then((res) => {
        const practitioner = res.body;
        expect(practitioner).toBeDefined();
        expect(practitioner).toHaveProperty('id', '1');
        expect(practitioner).toHaveProperty('resourceType', 'Practitioner');
      });
  });

  it('/Practitioner/:id (GET) - Not Found', async () => {
    return request(app.getHttpServer())
      .get('/Practitioner/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'practitioner not found');
      });
  });
});
