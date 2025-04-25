import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { EPISODES_PER_PATIENT, NUMBER_OF_EPISODES } from "../config";
import { AppModule } from "../src/app.module";

describe("EpisodeOfCareController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/EpisodeOfCare (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/EpisodeOfCare")
      .expect(200)
      .then((res) => {
        const episodes = res.body;
        expect(episodes).toBeDefined();
        expect(episodes).toHaveProperty("resourceType", "Bundle");
        expect(episodes.entry).toHaveLength(NUMBER_OF_EPISODES);
      });
  });

  it("/EpisodeOfCare?patient=patient-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/EpisodeOfCare?patient=patient-1")
      .expect(200)
      .then((res) => {
        const episodes = res.body;
        expect(episodes).toBeDefined();
        expect(episodes).toHaveProperty("resourceType", "Bundle");
        expect(episodes.entry).toHaveLength(EPISODES_PER_PATIENT);
        expect(episodes.entry[0].resource.patient.reference).toBe(
          "Patient/patient-1",
        );
        expect(episodes.entry[1].resource.patient.reference).toBe(
          "Patient/patient-1",
        );
        expect(episodes.entry[2].resource.patient.reference).toBe(
          "Patient/patient-1",
        );
        expect(episodes.entry[3].resource.patient.reference).toBe(
          "Patient/patient-1",
        );
      });
  });

  it("/EpisodeOfCare?diagnosis-reference=condition-5 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/EpisodeOfCare?diagnosis-reference=condition-5")
      .expect(200)
      .then((res) => {
        const episodes = res.body;
        expect(episodes).toBeDefined();
        expect(episodes).toHaveProperty("resourceType", "Bundle");
        expect(episodes.entry).toHaveLength(1);
        expect(episodes.entry[0].resource.patient.reference).toBe(
          "Patient/patient-2",
        );
        expect(episodes.entry[0].resource.diagnosis).toEqual([
          {
            condition: [{ reference: { reference: "Condition/condition-5" } }],
          },
        ]);
      });
  });

  it("/EpisodeOfCare?patient=1&title=foo (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/EpisodeOfCare?patient=1&title=foo")
      .expect(400)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", [
          "property title should not exist",
        ]);
      });
  });

  it("/EpisodeOfCare/:id (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/EpisodeOfCare/episode-of-care-1")
      .expect(200)
      .then((res) => {
        const episode = res.body;
        expect(episode).toBeDefined();
        expect(episode).toHaveProperty("id", "episode-of-care-1");
        expect(episode).toHaveProperty("resourceType", "EpisodeOfCare");
      });
  });

  it("/EpisodeOfCare/:id (GET) - Not Found", async () => {
    return request(app.getHttpServer())
      .get("/EpisodeOfCare/unknown")
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", "episode not found");
      });
  });
});
