import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataStoreService } from '../src/db/dataStore.service';
import { testDataStore } from '../src/test/testDataStore';

describe('PatientController (e2e)', () => {
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

  it('/Patient (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Patient')
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty('resourceType', 'Bundle');
        expect(patients.entry).toHaveLength(3);
      });
  });

  it('/Patient/:id (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Patient/1')
      .expect(200)
      .then((res) => {
        const patient = res.body;
        expect(patient).toBeDefined();
        expect(patient).toHaveProperty('id', '1');
        expect(patient).toHaveProperty('resourceType', 'Patient');
      });
  });

  it('/Patient/:id (GET) - Not Found', async () => {
    return request(app.getHttpServer())
      .get('/Patient/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'patient not found');
      });
  });
});
