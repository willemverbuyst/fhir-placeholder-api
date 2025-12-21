import { describe, expect, it } from "vitest";
import { createPatient, createPatients } from "./patient";

describe("createPatient", () => {
  it("should create a Patient with a valid structure", () => {
    const organizationId = "organization-1";
    const practitionerId = "practitioner-1";
    const patientId = "patient-1";
    const patient = createPatient({
      organizationId,
      practitionerId,
      id: patientId,
      startDate: "1950-01-01",
    });

    expect(patient).toHaveProperty("id");
    expect(patient).toHaveProperty("resourceType", "Patient");
    expect(patient).toHaveProperty("name");
    expect(patient.name).toBeInstanceOf(Array);

    if (!patient.name) {
      throw new Error("Patient name array is empty");
    }

    expect(patient.name[0]).toHaveProperty("family");
    expect(patient.name[0]).toHaveProperty("given");
    expect(patient.name[0].given).toBeInstanceOf(Array);
    expect(patient).toHaveProperty("birthDate");
    expect(patient).toHaveProperty("gender");
    expect(["male", "female", "other", "unknown"]).toContain(patient.gender);

    expect(patient).toHaveProperty("active");
    expect(patient).toHaveProperty("telecom");
    expect(patient.telecom).toBeInstanceOf(Array);
    expect(patient).toHaveProperty("address");

    expect(patient).toHaveProperty("managingOrganization");
    expect(patient.managingOrganization).toHaveProperty("reference");

    if (!patient.managingOrganization) {
      throw new Error("Patient managingOrganization reference is undefined");
    }

    expect(patient.managingOrganization.reference).toBe(
      `Organization/${organizationId}`,
    );
    expect(patient).toHaveProperty("generalPractitioner");
    expect(patient.generalPractitioner).toBeInstanceOf(Array);

    if (!patient.generalPractitioner) {
      throw new Error("Patient generalPractitioner array is empty");
    }

    expect(patient.generalPractitioner[0]).toHaveProperty("reference");
    expect(patient.generalPractitioner[0].reference).toBe(
      `Practitioner/${practitionerId}`,
    );
    expect(patient).toHaveProperty("communication");
    expect(patient.communication).toBeInstanceOf(Array);

    if (!patient.communication) {
      throw new Error("Patient communication array is empty");
    }

    expect(patient.communication[0]).toHaveProperty("language");
    expect(patient.communication[0].language).toHaveProperty("coding");
    expect(patient.communication[0].language.coding).toBeInstanceOf(Array);
    expect(patient.communication[0]).toHaveProperty("preferred");
    expect(patient.communication[0].preferred).toBe(true);
  });

  it("should generate a valid birthDate within the specified range", () => {
    const organizationId = "organization-1";
    const practitionerId = "practitioner-1";
    const patientId = "patient-1";
    const patient = createPatient({
      organizationId,
      practitionerId,
      id: patientId,
      startDate: "1950-01-01",
    });

    if (!patient.birthDate) {
      throw new Error("Patient birthDate is undefined");
    }
    const birthDate = new Date(patient.birthDate);
    const startDate = new Date("1950-01-01");
    const now = new Date();

    expect(birthDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(birthDate.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it("should create telecom entries with valid email and phone", () => {
    const organizationId = "organization-1";
    const practitionerId = "practitioner-1";
    const patientId = "patient-1";
    const patient = createPatient({
      organizationId,
      practitionerId,
      id: patientId,
      startDate: "1950-01-01",
    });

    if (!patient.telecom) {
      throw new Error("Patient telecom array is empty");
    }

    const email = patient.telecom.find((t) => t.system === "email");
    const phone = patient.telecom.find((t) => t.system === "phone");

    expect(email).toBeDefined();
    expect(email).toHaveProperty("value");
    expect(phone).toBeDefined();
    expect(phone).toHaveProperty("value");
  });

  it("should create a valid address", () => {
    const organizationId = "organization-1";
    const practitionerId = "practitioner-1";
    const patientId = "patient-1";
    const patient = createPatient({
      organizationId,
      practitionerId,
      id: patientId,
      startDate: "1950-01-01",
    });

    if (!patient.address) {
      throw new Error("Patient address array is empty");
    }

    expect(patient.address[0]).toHaveProperty("line");
    expect(patient.address[0]).toHaveProperty("city");
    expect(patient.address[0]).toHaveProperty("state");
    expect(patient.address[0]).toHaveProperty("postalCode");
    expect(patient.address[0]).toHaveProperty("country");
  });
});

describe("createPatients", () => {
  const patients = createPatients({
    numberOfPatients: 8,
    numberOfOrganizations: 2,
    numberOfPractitioners: 4,
    startDate: "1950-01-01",
  });

  it.each`
    patientId      | organizationId      | practitionerId
    ${"patient-1"} | ${"organization-1"} | ${"practitioner-1"}
    ${"patient-2"} | ${"organization-1"} | ${"practitioner-1"}
    ${"patient-3"} | ${"organization-1"} | ${"practitioner-2"}
    ${"patient-4"} | ${"organization-1"} | ${"practitioner-2"}
    ${"patient-5"} | ${"organization-2"} | ${"practitioner-3"}
    ${"patient-6"} | ${"organization-2"} | ${"practitioner-3"}
    ${"patient-7"} | ${"organization-2"} | ${"practitioner-4"}
    ${"patient-8"} | ${"organization-2"} | ${"practitioner-4"}
  `(
    "should assign correct organization and practitioner to patient $patientId",
    ({ patientId, organizationId, practitionerId }) => {
      const patient = patients[patientId.slice(-1) - 1];

      expect(patient).toHaveProperty("id", patientId);
      expect(patient.resourceType).toBe("Patient");
      expect(patient.managingOrganization?.reference).toBe(
        `Organization/${organizationId}`,
      );

      for (const generalPractitioner of patient.generalPractitioner ?? []) {
        expect(generalPractitioner.reference).toBe(
          `Practitioner/${practitionerId}`,
        );
      }
    },
  );

  it("should create the specified number of patients", () => {
    const patients = createPatients({
      numberOfPatients: 3,
      numberOfOrganizations: 1,
      numberOfPractitioners: 1,
      startDate: "1950-01-01",
    });

    expect(patients).toHaveLength(3);
  });

  it("should return an empty array if numberOfPatients is 0", () => {
    const patients = createPatients({
      numberOfPatients: 0,
      numberOfOrganizations: 1,
      numberOfPractitioners: 1,
      startDate: "1950-01-01",
    });

    expect(patients).toHaveLength(0);
  });
});
