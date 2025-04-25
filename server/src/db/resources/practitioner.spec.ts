import { START_DATE } from "../../../config";
import { createPractitioner } from "./practitioner";

describe("createPractitioner", () => {
  it("should create a Practitioner with a valid structure", () => {
    const practitionerId = "practitioner-1";
    const practitioner = createPractitioner(practitionerId);

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
    const practitioner = createPractitioner(practitionerId);

    if (!practitioner.birthDate) {
      throw new Error("Practitioner birthDate is undefined");
    }
    const birthDate = new Date(practitioner.birthDate);
    const startDate = new Date(START_DATE);
    const now = new Date();

    expect(birthDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(birthDate.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it("should create telecom entries with valid email and phone", () => {
    const practitionerId = "practitioner-1";
    const practitioner = createPractitioner(practitionerId);

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
    const practitioner = createPractitioner(practitionerId);

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
