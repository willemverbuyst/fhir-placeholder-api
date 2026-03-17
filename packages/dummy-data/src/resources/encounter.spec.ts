import { ENCOUNTER_STATUS } from "@repo/fhir-terminology";
import { Patient } from "fhir/r5";
import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import { createEncounter, createEncounters } from "./encounter";

describe("createEncounter", () => {
  it("should create an Encounter with the correct structure", () => {
    const patientId = "patient-1";
    const episodeId = "episode-1";
    const encounterId = "encounter-1";
    const startDate = new Date("2000-01-01T00:00:00.000Z");
    const encounter = createEncounter({
      patientId,
      episodeId,
      id: encounterId,
      startDate,
    });

    expect(encounter).toHaveProperty("id");
    expect(encounter.resourceType).toBe("Encounter");
    expect(Object.values(ENCOUNTER_STATUS)).toContain(encounter.status);
    expect(encounter.subject).toEqual({ reference: `Patient/${patientId}` });
    expect(encounter.episodeOfCare).toHaveLength(1);

    if (!encounter.episodeOfCare) {
      throw new Error("Encounter episodeOfCare array is empty");
    }

    expect(encounter.episodeOfCare[0].reference?.split("/")[1]).toBe(episodeId);

    if (!encounter.actualPeriod?.start) {
      throw new Error("Encounter actualPeriod.start is missing");
    }

    const actualStart = new Date(encounter.actualPeriod.start);
    expect(actualStart.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(actualStart.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("should not create an Encounter with an actualPeriod.start if the patient's birthDate is not provided", () => {
    const patientId = "patient-1";
    const episodeId = "episode-1";
    const encounterId = "encounter-1";
    const encounter = createEncounter({
      patientId,
      episodeId,
      id: encounterId,
      startDate: undefined,
    });

    expect(encounter).toHaveProperty("id");
    expect(encounter.resourceType).toBe("Encounter");
    expect(encounter.subject).toEqual({ reference: `Patient/${patientId}` });
    expect(encounter.episodeOfCare).toHaveLength(1);
    expect(encounter.actualPeriod).toBeUndefined();
  });
});

describe("createEncounters", () => {
  const idGen = new IdGenerator();
  idGen.refs.set("patient", ["patient-1", "patient-2"]);
  idGen.refs.set("episode-of-care", [
    "episode-of-care-1",
    "episode-of-care-2",
    "episode-of-care-3",
    "episode-of-care-4",
  ]);
  const patients: Patient[] = [
    {
      resourceType: "Patient",
      id: "patient-1",
      birthDate: "1980-01-01",
    },
    {
      resourceType: "Patient",
      id: "patient-2",
      birthDate: "1990-01-01",
    },
  ];
  const encounters = createEncounters({
    numberOfEncounters: 12,
    numberOfPatients: 2,
    numberOfEpisodes: 4,
    idGen,
    patients,
  });

  it.each`
    encounterId       | patientId      | episodeId
    ${"encounter-1"}  | ${"patient-1"} | ${"episode-of-care-1"}
    ${"encounter-2"}  | ${"patient-1"} | ${"episode-of-care-1"}
    ${"encounter-3"}  | ${"patient-1"} | ${"episode-of-care-1"}
    ${"encounter-4"}  | ${"patient-1"} | ${"episode-of-care-2"}
    ${"encounter-5"}  | ${"patient-1"} | ${"episode-of-care-2"}
    ${"encounter-6"}  | ${"patient-1"} | ${"episode-of-care-2"}
    ${"encounter-7"}  | ${"patient-2"} | ${"episode-of-care-3"}
    ${"encounter-8"}  | ${"patient-2"} | ${"episode-of-care-3"}
    ${"encounter-9"}  | ${"patient-2"} | ${"episode-of-care-3"}
    ${"encounter-10"} | ${"patient-2"} | ${"episode-of-care-4"}
    ${"encounter-11"} | ${"patient-2"} | ${"episode-of-care-4"}
    ${"encounter-12"} | ${"patient-2"} | ${"episode-of-care-4"}
  `(
    "should assign correct patient and episode to encounter $encounterId",
    ({ encounterId, patientId, episodeId }) => {
      const encounter =
        encounters[
          Number.parseInt(encounterId.replace("encounter-", ""), 10) - 1
        ];

      expect(encounter).toHaveProperty("id", encounterId);
      expect(encounter.resourceType).toBe("Encounter");
      expect(encounter.subject?.reference).toBe(`Patient/${patientId}`);
      expect(encounter.episodeOfCare?.[0]?.reference).toBe(
        `EpisodeOfCare/${episodeId}`,
      );
      expect(encounter.actualPeriod?.start).toBeDefined();
      expect(
        new Date(encounter.actualPeriod?.start ?? "").getTime(),
      ).toBeGreaterThanOrEqual(
        new Date(
          patients[Number.parseInt(patientId.replace("patient-", ""), 10) - 1]
            .birthDate ?? "",
        ).getTime(),
      );
    },
  );

  it("should create the specified number of encounters", () => {
    const encounters = createEncounters({
      numberOfEncounters: 3,
      numberOfPatients: 1,
      numberOfEpisodes: 1,
      idGen: new IdGenerator(),
      patients: [
        {
          resourceType: "Patient",
          id: "patient-1",
          birthDate: "1985-01-01",
        },
      ],
    });

    expect(encounters).toHaveLength(3);
  });

  it("should return an empty array if numberOfEncounters is 0", () => {
    const encounters = createEncounters({
      numberOfEncounters: 0,
      numberOfPatients: 1,
      numberOfEpisodes: 1,
      idGen: new IdGenerator(),
      patients: [
        {
          resourceType: "Patient",
          id: "patient-1",
          birthDate: "1985-01-01",
        },
      ],
    });

    expect(encounters).toHaveLength(0);
  });
});
