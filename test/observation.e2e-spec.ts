import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ObservationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/Observation (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Observation')
      .expect(200)
      .then((res) => {
        const observations = res.body;
        expect(observations).toBeDefined();
        expect(observations).toHaveProperty('resourceType', 'Bundle');
        expect(observations.entry).toHaveLength(960);
      });
  });

  it('/Observation?patient=patient-2 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Observation?patient=patient-2')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(40);
      });
  });

  it('/Observation?encounter=encounter-2 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Observation?encounter=encounter-2')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(2);
      });
  });

  it('/Observation?encounter=encounter-2&patient=patient-2 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/Observation?encounter=encounter-2&patient=patient-2')
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty('resourceType', 'Bundle');
        expect(encounters.entry).toHaveLength(2);
      });
  });
});
