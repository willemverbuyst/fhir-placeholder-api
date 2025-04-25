import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import {
  ENCOUNTERS_PER_PATIENT,
  EPISODES_PER_PATIENT,
  NUMBER_OF_ENCOUNTERS,
} from "../config";
import { AppModule } from "../src/app.module";

describe("EncounterController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Encounter (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Encounter")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(NUMBER_OF_ENCOUNTERS);
      });
  });

  it("/Encounter?patient=patient-2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Encounter?patient=patient-2")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(ENCOUNTERS_PER_PATIENT);
      });
  });

  it("/Encounter?episode-of-care=2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Encounter?episode-of-care=episode-of-care-2")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(
          ENCOUNTERS_PER_PATIENT / EPISODES_PER_PATIENT,
        );
      });
  });

  it("/Encounter?patient=patient-2&episode-of-care=episode-of-care2 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Encounter?patient=patient-2&episode-of-care=episode-of-care-6")
      .expect(200)
      .then((res) => {
        const encounters = res.body;
        expect(encounters).toBeDefined();
        expect(encounters).toHaveProperty("resourceType", "Bundle");
        expect(encounters.entry).toHaveLength(
          ENCOUNTERS_PER_PATIENT / EPISODES_PER_PATIENT,
        );
      });
  });
});
