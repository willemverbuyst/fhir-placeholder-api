import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ObservationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();

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
        expect(observations.entry).toHaveLength(480);
      });
  });
});
