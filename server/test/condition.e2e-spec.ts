import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { CONDITIONS_PER_PATIENT, NUMBER_OF_CONDITIONS } from "../config";
import { AppModule } from "../src/app.module";

describe("ConditionController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  console.log("ENV", process.env.NODE_ENV);

  it("/Condition (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Condition")
      .expect(200)
      .then((res) => {
        const conditions = res.body;
        expect(conditions).toBeDefined();
        expect(conditions).toHaveProperty("resourceType", "Bundle");
        expect(conditions.entry).toHaveLength(NUMBER_OF_CONDITIONS);
      });
  });

  it("/Condition?patient=patient-1 (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Condition?patient=Patient/patient-1")
      .expect(200)
      .then((res) => {
        const conditions = res.body;
        expect(conditions).toBeDefined();
        expect(conditions).toHaveProperty("resourceType", "Bundle");
        expect(conditions.entry).toHaveLength(CONDITIONS_PER_PATIENT);
      });
  });

  it("/Condition/:id (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Condition/condition-1")
      .expect(200)
      .then((res) => {
        const condition = res.body;
        expect(condition).toBeDefined();
        expect(condition).toHaveProperty("id", "condition-1");
        expect(condition).toHaveProperty("resourceType", "Condition");
      });
  });

  it("/Condition/:id (GET) - Not Found", async () => {
    return request(app.getHttpServer())
      .get("/Condition/unknown")
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", "condition not found");
      });
  });
});
