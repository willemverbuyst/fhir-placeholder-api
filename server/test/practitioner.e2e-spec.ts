import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { NUMBER_OF_PRACTITIONERS } from "../config";
import { AppModule } from "../src/app.module";

describe("PractitionerController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Practitioner (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Practitioner")
      .expect(200)
      .then((res) => {
        const practitioners = res.body;
        expect(practitioners).toBeDefined();
        expect(practitioners).toHaveProperty("resourceType", "Bundle");
        expect(practitioners.entry).toHaveLength(NUMBER_OF_PRACTITIONERS);
      });
  });

  it("/Practitioner/:id (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Practitioner/practitioner-1")
      .expect(200)
      .then((res) => {
        const practitioner = res.body;
        expect(practitioner).toBeDefined();
        expect(practitioner).toHaveProperty("id", "practitioner-1");
        expect(practitioner).toHaveProperty("resourceType", "Practitioner");
      });
  });

  it("/Practitioner/:id (GET) - Not Found", async () => {
    return request(app.getHttpServer())
      .get("/Practitioner/unknown")
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", "practitioner not found");
      });
  });
});
