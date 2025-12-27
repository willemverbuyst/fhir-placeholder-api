import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import {
  APPOINTMENTS_PER_PATIENT,
  NUMBER_OF_APPOINTMENTS,
} from "../src/config/dummyDataConfig";

describe("AppointmentController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Appointment (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Appointment")
      .expect(200)
      .then((res) => {
        const appointments = res.body;
        expect(appointments).toBeDefined();
        expect(appointments).toHaveProperty("resourceType", "Bundle");
        expect(appointments.entry).toHaveLength(NUMBER_OF_APPOINTMENTS);
      });
  });

  it("/Appointment?patient=patient-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Appointment?patient=Patient/patient-1")
      .expect(200)
      .then((res) => {
        const conditions = res.body;
        expect(conditions).toBeDefined();
        expect(conditions).toHaveProperty("resourceType", "Bundle");
        expect(conditions.entry).toHaveLength(APPOINTMENTS_PER_PATIENT);
      });
  });
});
