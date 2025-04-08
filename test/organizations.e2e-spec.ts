import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataStoreService } from '../src/db/dataStore.service';
import { testDataStore } from '../src/test/testDataStore';

describe('OrganizationsController (e2e)', () => {
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

  it('/organizations (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/organizations')
      .expect(200)
      .then((res) => {
        const organizations = res.body;
        expect(organizations).toBeDefined();
        expect(organizations).toHaveLength(3);
      });
  });

  it('/organizations?name=test%20organization (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/organizations?name=test%20organization')
      .expect(200)
      .then((res) => {
        const organizations = res.body;
        expect(organizations).toBeDefined();
        expect(organizations).toHaveLength(2);
        expect(organizations[0].name).toBe('test organization');
        expect(organizations[0].name).toBe('test organization');
      });
  });

  it('/organizations?name=Acme&city=Somewhere (GET) - Bad Request', async () => {
    return request(app.getHttpServer())
      .get('/organizations?name=Acme&city=lala')
      .expect(400)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', [
          'property city should not exist',
        ]);
      });
  });

  it('/organizations/:id (GET) - OK', async () => {
    return request(app.getHttpServer())
      .get('/organizations/1')
      .expect(200)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty('id', '1');
        expect(organization).toHaveProperty('resourceType', 'Organization');
      });
  });

  it('/organizations/:id (GET) - Not Found', async () => {
    return request(app.getHttpServer())
      .get('/organizations/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'organization not found');
      });
  });

  it('/organizations/:id (PATCH) - OK', async () => {
    return request(app.getHttpServer())
      .patch('/organizations/1')
      .set('Accept', 'application/json')
      .send({
        name: 'Updated Organization Name',
      })
      .expect(200)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty('id', '1');
        expect(organization).toHaveProperty('resourceType', 'Organization');
        expect(organization).toHaveProperty(
          'name',
          'Updated Organization Name',
        );
      });
  });

  it('/organizations/:id (PATCH) - Not found', async () => {
    return request(app.getHttpServer())
      .patch('/organizations/unknown')
      .set('Accept', 'application/json')
      .send({
        name: 'Updated Organization Name',
      })
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'organization not found');
      });
  });

  it('/organizations/:id (DELETE) - OK', async () => {
    return request(app.getHttpServer())
      .delete('/organizations/1')
      .expect(200)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty('id', '1');
        expect(organization).toHaveProperty('resourceType', 'Organization');
      });
  });

  it('/organizations/:id (DELETE) - Not Found', async () => {
    return request(app.getHttpServer())
      .delete('/organizations/unknown')
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty('message', 'organization not found');
      });
  });

  it('/organizations/:id (POST) - Created', async () => {
    return request(app.getHttpServer())
      .post('/organizations')
      .set('Accept', 'application/json')
      .send({
        name: 'New Organization Name',
      })
      .expect(201)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty('resourceType', 'Organization');
        expect(organization).toHaveProperty('name', 'New Organization Name');
      });
  });
});
