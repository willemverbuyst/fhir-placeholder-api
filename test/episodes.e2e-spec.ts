import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataStoreService } from './../src/db/dataStore.service';
import { testDataStore } from './../src/test/testDataStore';

describe('EpisodesController (e2e)', () => {
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

  it('/episodes (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/episodes')
      .expect(200)
      .then((res) => {
        const episodes = res.body;
        expect(episodes).toBeDefined();
        expect(episodes).toHaveLength(3);
      });
  });

  it('/episodes?patient=1 (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/episodes?patient=1')
      .expect(200)
      .then((res) => {
        const episodes = res.body;
        expect(episodes).toBeDefined();
        expect(episodes).toHaveLength(2);
        expect(episodes[0].patient.reference).toBe('Patient/1');
        expect(episodes[1].patient.reference).toBe('Patient/1');
      });
  });

  it('/episodes?patient=1&title=foo (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/episodes?patient=1&title=foo')
      .expect(400)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', [
          'property title should not exist',
        ]);
      });
  });

  it('/episodes/:id (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/episodes/1')
      .expect(200)
      .then((res) => {
        const episode = res.body;
        expect(episode).toBeDefined();
        expect(episode).toHaveProperty('id', '1');
        expect(episode).toHaveProperty('resourceType', 'EpisodeOfCare');
      });
  });

  it('/episodes/:id (GET) - Not Found', async () => {
    return request(app.getHttpServer())
      .get('/episodes/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'episode not found');
      });
  });
});
