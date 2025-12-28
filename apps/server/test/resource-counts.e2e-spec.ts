import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("ResourceCountsController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/$resource-counts (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/$resource-counts")
      .expect(200)
      .then((res) => {
        const {
          patients,
          episodes,
          conditions,
          organizations,
          practitioners,
          practitionerRoles,
          encounters,
          observations,
          appointments,
        } = res.body;

        expect(patients).toBe(24);
        expect(episodes).toBe(96);
        expect(conditions).toBe(96);
        expect(organizations).toBe(3);
        expect(practitioners).toBe(6);
        expect(practitionerRoles).toBe(6);
        expect(encounters).toBe(480);
        expect(observations).toBe(960);
        expect(appointments).toBe(48);
      });
  });
});
