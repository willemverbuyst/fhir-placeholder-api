import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataStoreService } from './../src/db/dataStore.service';
import { testDataStore } from './../src/test/testDataStore';

describe('ConditionsController (e2e)', () => {
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

  it('/conditions (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/conditions')
      .expect(200)
      .then((res) => {
        const conditions = res.body;
        expect(conditions).toBeDefined();
        expect(conditions).toHaveLength(2);
      });
  });

  it('/conditions/:id (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/conditions/1')
      .expect(200)
      .then((res) => {
        const condition = res.body;
        expect(condition).toBeDefined();
        expect(condition).toHaveProperty('id', '1');
        expect(condition).toHaveProperty('resourceType', 'Condition');
      });
  });

  it('/conditions/:id (GET) - Not Found', async () => {
    return request(app.getHttpServer())
      .get('/conditions/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'condition not found');
      });
  });
});
