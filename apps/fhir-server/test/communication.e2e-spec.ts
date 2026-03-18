import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("CommunicationController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Communication (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Communication")
      .expect(200)
      .then((res) => {
        const communications = res.body;
        expect(communications).toBeDefined();
        expect(communications).toHaveProperty("resourceType", "Bundle");
        expect(communications.entry).toHaveLength(480);
      });
  });

  it("/Communication?patient=patient-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Communication?patient=patient-2")
      .expect(200)
      .then((res) => {
        const communications = res.body;
        expect(communications).toBeDefined();
        expect(communications).toHaveProperty("resourceType", "Bundle");
        expect(communications.entry).toHaveLength(20);
      });
  });

  it("/Communication?encounter=encounter-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Communication?encounter=encounter-2")
      .expect(200)
      .then((res) => {
        const communications = res.body;
        expect(communications).toBeDefined();
        expect(communications).toHaveProperty("resourceType", "Bundle");
        expect(communications.entry).toHaveLength(1);
      });
  });

  it("/Communication?encounter=encounter-1&patient=patient-1(GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Communication?encounter=encounter-1&patient=patient-1")
      .expect(200)
      .then((res) => {
        const communications = res.body;
        expect(communications).toBeDefined();
        expect(communications).toHaveProperty("resourceType", "Bundle");
        expect(communications.entry).toHaveLength(1);
      });
  });
});
