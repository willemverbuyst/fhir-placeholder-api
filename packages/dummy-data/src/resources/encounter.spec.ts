import { ENCOUNTER_STATUS } from "@repo/fhir-terminology";
import { describe, expect, it } from "vitest";
import { IdGenerator } from "../idGenerator";
import { createEncounter, createEncounters } from "./encounter";

describe("createEncounter", () => {
  it("should create an Encounter with the correct structure", () => {
    const patientId = "patient-1";
    const episodeId = "episode-1";
    const encounterId = "encounter-1";
    const encounter = createEncounter({
      patientId,
      episodeId,
      id: encounterId,
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
  const encounters = createEncounters({
    numberOfEncounters: 12,
    numberOfPatients: 2,
    numberOfEpisodes: 4,
    idGen,
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
    },
  );

  it("should create the specified number of encounters", () => {
    const encounters = createEncounters({
      numberOfEncounters: 3,
      numberOfPatients: 1,
      numberOfEpisodes: 1,
      idGen: new IdGenerator(),
    });

    expect(encounters).toHaveLength(3);
  });

  it("should return an empty array if numberOfEncounters is 0", () => {
    const encounters = createEncounters({
      numberOfEncounters: 0,
      numberOfPatients: 1,
      numberOfEpisodes: 1,
      idGen: new IdGenerator(),
    });

    expect(encounters).toHaveLength(0);
  });
});
