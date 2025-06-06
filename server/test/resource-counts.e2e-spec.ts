import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import {
  NUMBER_OF_APPOINTMENTS,
  NUMBER_OF_CONDITIONS,
  NUMBER_OF_ENCOUNTERS,
  NUMBER_OF_EPISODES,
  NUMBER_OF_OBSERVATIONS,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
  NUMBER_OF_PRACTITIONER_ROLES,
} from "../config";
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

        expect(patients).toBe(NUMBER_OF_PATIENTS);
        expect(episodes).toBe(NUMBER_OF_EPISODES);
        expect(conditions).toBe(NUMBER_OF_CONDITIONS);
        expect(organizations).toBe(NUMBER_OF_ORGANIZATIONS);
        expect(practitioners).toBe(NUMBER_OF_PRACTITIONERS);
        expect(practitionerRoles).toBe(NUMBER_OF_PRACTITIONER_ROLES);
        expect(encounters).toBe(NUMBER_OF_ENCOUNTERS);
        expect(observations).toBe(NUMBER_OF_OBSERVATIONS);
        expect(appointments).toBe(NUMBER_OF_APPOINTMENTS);
      });
  });
});
