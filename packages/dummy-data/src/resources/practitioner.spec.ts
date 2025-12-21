import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import { createPractitioner, createPractitioners } from "./practitioner";

describe("createPractitioner", () => {
  it("should create a Practitioner with a valid structure", () => {
    const practitionerId = "practitioner-1";
    const practitioner = createPractitioner({
      id: practitionerId,
      startDate: "1950-01-01",
    });

    expect(practitioner).toHaveProperty("id");
    expect(practitioner).toHaveProperty("resourceType", "Practitioner");
    expect(practitioner).toHaveProperty("name");
    expect(practitioner.name).toBeInstanceOf(Array);

    if (!practitioner.name) {
      throw new Error("Practitioner name array is empty");
    }

    expect(practitioner.name[0]).toHaveProperty("family");
    expect(practitioner.name[0]).toHaveProperty("given");
    expect(practitioner.name[0].given).toBeInstanceOf(Array);
    expect(practitioner).toHaveProperty("active", true);
    expect(practitioner).toHaveProperty("birthDate");
    expect(practitioner).toHaveProperty("gender");
    expect(["male", "female", "other", "unknown"]).toContain(
      practitioner.gender,
    );
    expect(practitioner).toHaveProperty("telecom");
    expect(practitioner.telecom).toBeInstanceOf(Array);
    expect(practitioner).toHaveProperty("address");
    expect(practitioner.address).toBeInstanceOf(Array);
  });

  it("should generate a valid birthDate within the specified range", () => {
    const practitionerId = "practitioner-1";
    const practitioner = createPractitioner({
      id: practitionerId,
      startDate: "1950-01-01",
    });

    if (!practitioner.birthDate) {
      throw new Error("Practitioner birthDate is undefined");
    }
    const birthDate = new Date(practitioner.birthDate);
    const startDate = new Date("1950-01-01");
    const now = new Date();

    expect(birthDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(birthDate.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it("should create telecom entries with valid email and phone", () => {
    const practitionerId = "practitioner-1";
    const practitioner = createPractitioner({
      id: practitionerId,
      startDate: "1950-01-01",
    });

    if (!practitioner.telecom) {
      throw new Error("Practitioner telecom array is undefined");
    }

    const email = practitioner.telecom.find((t) => t.system === "email");
    const phone = practitioner.telecom.find((t) => t.system === "phone");

    expect(email).toBeDefined();
    expect(email).toHaveProperty("value");
    expect(phone).toBeDefined();
    expect(phone).toHaveProperty("value");
  });

  it("should create a valid address", () => {
    const practitionerId = "practitioner-1";
    const practitioner = createPractitioner({
      id: practitionerId,
      startDate: "1950-01-01",
    });

    if (!practitioner.address) {
      throw new Error("Practitioner address array is undefined");
    }

    const address = practitioner.address[0];

    expect(address).toHaveProperty("line");
    expect(address).toHaveProperty("city");
    expect(address).toHaveProperty("state");
    expect(address).toHaveProperty("postalCode");
    expect(address).toHaveProperty("country");
  });
});

describe("createPractitioners", () => {
  it("should create the specified number of practitioners", () => {
    const practitioners = createPractitioners({
      numberOfPractitioners: 5,
      startDate: "1950-01-01",
      idGen: new IdGenerator(),
    });

    expect(practitioners).toHaveLength(5);

    for (const practitioner of practitioners) {
      expect(practitioner).toHaveProperty("id");
      expect(practitioner.resourceType).toBe("Practitioner");
    }
  });

  it("should return an empty array if numberOfPractitioners is 0", () => {
    const practitioners = createPractitioners({
      numberOfPractitioners: 0,
      startDate: "1950-01-01",
      idGen: new IdGenerator(),
    });

    expect(practitioners).toHaveLength(0);
  });
});
