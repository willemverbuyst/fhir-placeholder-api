import { FLAG_STATUS } from "@repo/fhir-terminology";
import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import { createFlag, createFlags } from "./flag";

describe("createFlag", () => {
  it("should create a flag with a valid structure", () => {
    const patientId = "patient-1";
    const encounterId = "encounter-1";
    const flagId = "flag-1";

    const flag = createFlag({
      patientId,
      encounterId,
      id: flagId,
    });

    expect(flag).toHaveProperty("id", flagId);
    expect(flag).toHaveProperty("resourceType", "Flag");
    expect(FLAG_STATUS).toContain(flag.status);
    expect(flag.subject).toEqual({
      reference: `Patient/${patientId}`,
    });
    expect(flag.encounter).toEqual({
      reference: `Encounter/${encounterId}`,
    });
    // will need to update this when we have a flag code value set
    expect(flag.code.coding).toHaveLength(0);
  });
});

describe("createFlags", () => {
  const idGen = new IdGenerator();

  idGen.refs.set("patient", ["patient-1", "patient-2"]);

  idGen.refs.set("encounter", [
    "encounter-1",
    "encounter-2",
    "encounter-3",
    "encounter-4",
  ]);

  const flags = createFlags({
    numberOfFlags: 16,
    numberOfPatients: 2,
    numberOfEncounters: 4,
    idGen,
  });

  it.each`
    patientId      | encounterId      | flagId
    ${"patient-1"} | ${"encounter-1"} | ${"flag-1"}
    ${"patient-1"} | ${"encounter-1"} | ${"flag-2"}
    ${"patient-1"} | ${"encounter-1"} | ${"flag-3"}
    ${"patient-1"} | ${"encounter-1"} | ${"flag-4"}
    ${"patient-1"} | ${"encounter-2"} | ${"flag-5"}
    ${"patient-1"} | ${"encounter-2"} | ${"flag-6"}
    ${"patient-1"} | ${"encounter-2"} | ${"flag-7"}
    ${"patient-1"} | ${"encounter-2"} | ${"flag-8"}
    ${"patient-2"} | ${"encounter-3"} | ${"flag-9"}
    ${"patient-2"} | ${"encounter-3"} | ${"flag-10"}
    ${"patient-2"} | ${"encounter-3"} | ${"flag-11"}
    ${"patient-2"} | ${"encounter-3"} | ${"flag-12"}
    ${"patient-2"} | ${"encounter-4"} | ${"flag-13"}
    ${"patient-2"} | ${"encounter-4"} | ${"flag-14"}
    ${"patient-2"} | ${"encounter-4"} | ${"flag-15"}
    ${"patient-2"} | ${"encounter-4"} | ${"flag-16"}
  `(
    "should assign correct subject and encounter to flag $flagId",
    ({ patientId, encounterId, flagId }) => {
      const flag = flags[Number.parseInt(flagId.replace("flag-", ""), 10) - 1];

      expect(flag).toHaveProperty("id", flagId);
      expect(flag.resourceType).toBe("Flag");
      expect(flag.subject?.reference).toBe(`Patient/${patientId}`);
      expect(flag.encounter?.reference).toBe(`Encounter/${encounterId}`);
    },
  );

  it("should create the specified number of flags", () => {
    const flags = createFlags({
      numberOfFlags: 8,
      numberOfPatients: 4,
      numberOfEncounters: 4,
      idGen: new IdGenerator(),
    });

    expect(flags).toHaveLength(8);
  });

  it("should return an empty array if numberOfFlags is 0", () => {
    const flags = createFlags({
      numberOfFlags: 0,
      numberOfPatients: 4,
      numberOfEncounters: 4,
      idGen: new IdGenerator(),
    });

    expect(flags).toHaveLength(0);
  });
});
