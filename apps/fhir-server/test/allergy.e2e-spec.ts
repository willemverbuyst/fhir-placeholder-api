import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("AllergyIntoleranceController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/AllergyIntolerance (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/AllergyIntolerance")
      .expect(200)
      .then((res) => {
        const allergies = res.body;
        expect(allergies).toBeDefined();
        expect(allergies).toHaveProperty("resourceType", "Bundle");
        expect(allergies.entry).toHaveLength(24);
      });
  });
});
