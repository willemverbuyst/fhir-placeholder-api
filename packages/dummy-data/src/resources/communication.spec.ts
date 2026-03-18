import { COMMUNICATION_STATUS } from "@repo/fhir-terminology";
import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import { createCommunication, createCommunications } from "./communication";

describe("createCommunication", () => {
  it("should create a communication with a valid structure", () => {
    const patientId = "patient-1";
    const encounterId = "encounter-1";
    const communicationId = "communication-1";

    const communication = createCommunication({
      patientId,
      encounterId,
      id: communicationId,
    });

    expect(communication).toHaveProperty("id", communicationId);
    expect(communication).toHaveProperty("resourceType", "Communication");
    expect(COMMUNICATION_STATUS).toContain(communication.status);
    expect(communication.subject).toEqual({
      reference: `Patient/${patientId}`,
    });
    expect(communication.encounter).toEqual({
      reference: `Encounter/${encounterId}`,
    });
    expect(communication.note).toBeDefined();
    expect(communication.note?.[0].text).toBeDefined();
  });
});

describe("createCommunications", () => {
  const idGen = new IdGenerator();

  idGen.refs.set("patient", ["patient-1", "patient-2"]);

  idGen.refs.set("encounter", [
    "encounter-1",
    "encounter-2",
    "encounter-3",
    "encounter-4",
  ]);

  const communications = createCommunications({
    numberOfCommunications: 16,
    numberOfPatients: 2,
    numberOfEncounters: 4,
    idGen,
  });

  it.each`
    patientId      | encounterId      | communicationId
    ${"patient-1"} | ${"encounter-1"} | ${"communication-1"}
    ${"patient-1"} | ${"encounter-1"} | ${"communication-2"}
    ${"patient-1"} | ${"encounter-1"} | ${"communication-3"}
    ${"patient-1"} | ${"encounter-1"} | ${"communication-4"}
    ${"patient-1"} | ${"encounter-2"} | ${"communication-5"}
    ${"patient-1"} | ${"encounter-2"} | ${"communication-6"}
    ${"patient-1"} | ${"encounter-2"} | ${"communication-7"}
    ${"patient-1"} | ${"encounter-2"} | ${"communication-8"}
    ${"patient-2"} | ${"encounter-3"} | ${"communication-9"}
    ${"patient-2"} | ${"encounter-3"} | ${"communication-10"}
    ${"patient-2"} | ${"encounter-3"} | ${"communication-11"}
    ${"patient-2"} | ${"encounter-3"} | ${"communication-12"}
    ${"patient-2"} | ${"encounter-4"} | ${"communication-13"}
    ${"patient-2"} | ${"encounter-4"} | ${"communication-14"}
    ${"patient-2"} | ${"encounter-4"} | ${"communication-15"}
    ${"patient-2"} | ${"encounter-4"} | ${"communication-16"}
  `(
    "should assign correct subject and encounter to communication $communicationId",
    ({ patientId, encounterId, communicationId }) => {
      const communication =
        communications[
          Number.parseInt(communicationId.replace("communication-", ""), 10) - 1
        ];

      expect(communication).toHaveProperty("id", communicationId);
      expect(communication.resourceType).toBe("Communication");
      expect(communication.subject?.reference).toBe(`Patient/${patientId}`);
      expect(communication.encounter?.reference).toBe(
        `Encounter/${encounterId}`,
      );
    },
  );

  it("should create the specified number of communications", () => {
    const communications = createCommunications({
      numberOfCommunications: 8,
      numberOfPatients: 4,
      numberOfEncounters: 4,
      idGen: new IdGenerator(),
    });

    expect(communications).toHaveLength(8);
  });

  it("should return an empty array if numberOfCommunications is 0", () => {
    const communications = createCommunications({
      numberOfCommunications: 0,
      numberOfPatients: 4,
      numberOfEncounters: 4,
      idGen: new IdGenerator(),
    });

    expect(communications).toHaveLength(0);
  });
});
