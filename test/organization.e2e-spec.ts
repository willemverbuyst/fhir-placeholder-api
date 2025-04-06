import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataStoreService } from './../src/db/dataStore.service';
import { testDataStore } from './../src/test/testDataStore';

describe('OrganizationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataStoreService)
      .useValue(testDataStore)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/organizations (GET)', () => {
    return request(app.getHttpServer())
      .get('/organizations')
      .expect(200)
      .expect('Hello World!');
  });
});
