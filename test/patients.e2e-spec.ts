import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataStoreService } from './../src/db/dataStore.service';
import { testDataStore } from './../src/test/testDataStore';

describe('PatientsController (e2e)', () => {
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

  it('/patients (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/patients')
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveLength(2);
      });
  });

  it('/patients/:id (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/patients/1')
      .expect(200)
      .then((res) => {
        const patient = res.body;
        expect(patient).toBeDefined();
        expect(patient).toHaveProperty('id', '1');
        expect(patient).toHaveProperty('resourceType', 'Patient');
      });
  });

  it('/patients/:id (GET) - Not Found', async () => {
    return request(app.getHttpServer())
      .get('/patients/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'patient not found');
      });
  });

  it('/patients/:id/episodes (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/patients/1/episodes')
      .expect(200)
      .then((res) => {
        const episodes = res.body;
        expect(episodes).toBeDefined();
        expect(episodes).toHaveLength(2);
        expect(episodes[0].patient.reference).toBe('Patient/1');
        expect(episodes[1].patient.reference).toBe('Patient/1');
      });
  });
});
