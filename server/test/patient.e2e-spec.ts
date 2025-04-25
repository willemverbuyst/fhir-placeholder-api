import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import {
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
} from "../config";
import { AppModule } from "../src/app.module";

describe("PatientController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Patient (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Patient")
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(NUMBER_OF_PATIENTS);
      });
  });

  it("/Patient?organization=1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Patient?organization=organization-1")
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(
          NUMBER_OF_PATIENTS / NUMBER_OF_ORGANIZATIONS,
        );
      });
  });

  it("/Patient?general-practitioner=practitioner-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Patient?general-practitioner=practitioner-1")
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(
          NUMBER_OF_PATIENTS / NUMBER_OF_PRACTITIONERS,
        );
      });
  });

  it("/Patient?general-practitioner=practitioner-1&organization=organization-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get(
        "/Patient?general-practitioner=practitioner-1&organization=organization-1",
      )
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(
          NUMBER_OF_PATIENTS / NUMBER_OF_PRACTITIONERS,
        );
      });
  });

  it("/Patient/:id (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Patient/patient-1")
      .expect(200)
      .then((res) => {
        const patient = res.body;
        expect(patient).toBeDefined();
        expect(patient).toHaveProperty("id", "patient-1");
        expect(patient).toHaveProperty("resourceType", "Patient");
      });
  });

  it("/Patient/:id (GET) - Not Found", async () => {
    return request(app.getHttpServer())
      .get("/Patient/unknown")
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", "patient not found");
      });
  });
});
