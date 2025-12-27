import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { NUMBER_OF_ORGANIZATIONS } from "../src/config/dummyDataConfig";

describe("OrganizationController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/Organization (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Organization")
      .expect(200)
      .then((res) => {
        const organizations = res.body;
        expect(organizations).toBeDefined();
        expect(organizations).toHaveProperty("resourceType", "Bundle");
        expect(organizations.entry).toHaveLength(NUMBER_OF_ORGANIZATIONS);
      });
  });

  it("/Organization/:id (GET) - OK", async () => {
    return request(app.getHttpServer())
      .get("/Organization/organization-1")
      .expect(200)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty("id", "organization-1");
        expect(organization).toHaveProperty("resourceType", "Organization");
      });
  });

  it("/Organization/:id (GET) - Not Found", async () => {
    return request(app.getHttpServer())
      .get("/Organization/unknown")
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", "organization not found");
      });
  });

  it("/Organization/:id (PATCH) - OK", async () => {
    return request(app.getHttpServer())
      .patch("/Organization/organization-1")
      .set("Accept", "application/json")
      .send({
        name: "Updated Organization Name",
      })
      .expect(200)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty("id", "organization-1");
        expect(organization).toHaveProperty("resourceType", "Organization");
        expect(organization).toHaveProperty(
          "name",
          "Updated Organization Name",
        );
      });
  });

  it("/Organization/:id (PATCH) - Not found", async () => {
    return request(app.getHttpServer())
      .patch("/Organization/unknown")
      .set("Accept", "application/json")
      .send({
        name: "Updated Organization Name",
      })
      .expect(404)
      .then((res) => {
        const response = res.body;
        expect(response).toBeDefined();
        expect(response).toHaveProperty("message", "organization not found");
      });
  });

  it("/Organization/:id (POST) - Created", async () => {
    return request(app.getHttpServer())
      .post("/Organization")
      .set("Accept", "application/json")
      .send({
        name: "New Organization Name",
        active: true,
      })
      .expect(201)
      .then((res) => {
        const organization = res.body;
        expect(organization).toBeDefined();
        expect(organization).toHaveProperty("resourceType", "Organization");
        expect(organization).toHaveProperty("name", "New Organization Name");
        expect(organization).toHaveProperty("active", true);
      });
  });
});
