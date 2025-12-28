import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
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

  it("/PractitionerRole (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/PractitionerRole")
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(6);
      });
  });

  it("/PractitionerRole?organization=1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/PractitionerRole?organization=organization-1")
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(2);
      });
  });

  it("/PractitionerRole?practitioner=practitioner-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/PractitionerRole?practitioner=practitioner-1")
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(1);
      });
  });

  it("/PractitionerRole?practitioner=practitioner-1&organization=organization-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get(
        "/PractitionerRole?practitioner=practitioner-1&organization=organization-1",
      )
      .expect(200)
      .then((res) => {
        const patients = res.body;
        expect(patients).toBeDefined();
        expect(patients).toHaveProperty("resourceType", "Bundle");
        expect(patients.entry).toHaveLength(1);
      });
  });
});
