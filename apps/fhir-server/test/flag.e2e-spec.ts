import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("FlagController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Flag (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Flag")
      .expect(200)
      .then((res) => {
        const flags = res.body;
        expect(flags).toBeDefined();
        expect(flags).toHaveProperty("resourceType", "Bundle");
        expect(flags.entry).toHaveLength(480);
      });
  });

  it("/Flag?patient=patient-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Flag?patient=patient-2")
      .expect(200)
      .then((res) => {
        const flags = res.body;
        expect(flags).toBeDefined();
        expect(flags).toHaveProperty("resourceType", "Bundle");
        expect(flags.entry).toHaveLength(20);
      });
  });

  it("/Flag?encounter=encounter-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Flag?encounter=encounter-2")
      .expect(200)
      .then((res) => {
        const flags = res.body;
        expect(flags).toBeDefined();
        expect(flags).toHaveProperty("resourceType", "Bundle");
        expect(flags.entry).toHaveLength(1);
      });
  });

  it("/Flag?encounter=encounter-2&patient=patient-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Flag?encounter=encounter-2&patient=patient-2")
      .expect(200)
      .then((res) => {
        const flags = res.body;
        expect(flags).toBeDefined();
        expect(flags).toHaveProperty("resourceType", "Bundle");
        expect(flags.entry).toHaveLength(1);
      });
  });
});
