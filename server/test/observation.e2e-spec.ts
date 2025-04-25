import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import {
  ENCOUNTERS_PER_PATIENT,
  NUMBER_OF_OBSERVATIONS,
  OBSERVATIONS_PER_ENCOUNTER,
} from "../config";
import { AppModule } from "../src/app.module";

describe("ObservationController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Observation (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Observation")
      .expect(200)
      .then((res) => {
        const observations = res.body;
        expect(observations).toBeDefined();
        expect(observations).toHaveProperty("resourceType", "Bundle");
        expect(observations.entry).toHaveLength(NUMBER_OF_OBSERVATIONS);
      });
  });

  it("/Observation?patient=patient-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Observation?patient=patient-2")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(
          ENCOUNTERS_PER_PATIENT * OBSERVATIONS_PER_ENCOUNTER,
        );
      });
  });

  it("/Observation?encounter=encounter-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Observation?encounter=encounter-2")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(OBSERVATIONS_PER_ENCOUNTER);
      });
  });

  it("/Observation?encounter=encounter-2&patient=patient-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Observation?encounter=encounter-2&patient=patient-2")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(OBSERVATIONS_PER_ENCOUNTER);
      });
  });
});
