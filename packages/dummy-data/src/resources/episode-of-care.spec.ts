import { EPISODE_OF_CARE_STATUS } from "@repo/fhir-codes";
import { describe, expect, it } from "vitest";
import { episodeOfCareTypes } from "../valueSets/episode-of-care-type-value-set";
import { createEpisode, createEpisodes } from "./episode-of-care";

describe("createEpisode", () => {
  it("should create an EpisodeOfCare with the correct structure", () => {
    const patientId = "patient-1";
    const conditionId = "condition-1";
    const episodeId = "episode-1";
    const episode = createEpisode({ patientId, conditionId, id: episodeId });

    expect(episode).toHaveProperty("id");
    expect(episode.resourceType).toBe("EpisodeOfCare");
    expect(Object.values(EPISODE_OF_CARE_STATUS)).toContain(episode.status);
    expect(episode.patient).toEqual({ reference: `Patient/${patientId}` });
    expect(episode.diagnosis).toHaveLength(1);

    if (!episode.diagnosis) {
      throw new Error("EpisodeOfCare diagnosis array is empty");
    }

    if (!episode.diagnosis[0]?.condition) {
      throw new Error("EpisodeOfCare diagnosis[0].condition array is empty");
    }

    expect(episode.diagnosis[0].condition[0].reference).toEqual({
      reference: `Condition/${conditionId}`,
    });

    if (!episode.type) {
      throw new Error("EpisodeOfCare type array is empty");
    }

    expect(episode.type).toHaveLength(1);
    expect(episode.type[0].coding).toHaveLength(1);
  });

  it("should select a random type from the episodeOfCareTypes value set", () => {
    const patientId = "patient-1";
    const conditionId = "condition-1";
    const episodeId = "episode-1";
    const episode = createEpisode({ patientId, conditionId, id: episodeId });

    if (!episode.type) {
      throw new Error("EpisodeOfCare type array is empty");
    }

    if (!episode.type[0]?.coding) {
      throw new Error("EpisodeOfCare type[0].coding array is empty");
    }

    expect(episodeOfCareTypes).toContainEqual(episode.type[0].coding[0]);
  });
});

describe("createEpisodes", () => {
  const episodes = createEpisodes({
    numberOfEpisodes: 4,
    numberOfPatients: 2,
  });

  it.each`
    episodeId              | patientId
    ${"episode-of-care-1"} | ${"patient-1"}
    ${"episode-of-care-2"} | ${"patient-1"}
    ${"episode-of-care-3"} | ${"patient-2"}
    ${"episode-of-care-4"} | ${"patient-2"}
  `(
    "should assign correct patient to episode $episodeId",
    ({ episodeId, patientId }) => {
      const episode =
        episodes[
          Number.parseInt(episodeId.replace("episode-of-care-", ""), 10) - 1
        ];

      expect(episode).toHaveProperty("id", episodeId);
      expect(episode.resourceType).toBe("EpisodeOfCare");
      expect(episode.patient?.reference).toBe(`Patient/${patientId}`);
    },
  );

  it("should create episodes for the given patient and conditions", () => {
    const episodes = createEpisodes({
      numberOfEpisodes: 4,
      numberOfPatients: 2,
    });

    expect(episodes).toHaveLength(4);
  });

  it("should return an empty array if conditions are empty", () => {
    const episodes = createEpisodes({
      numberOfEpisodes: 0,
      numberOfPatients: 2,
    });

    expect(episodes).toHaveLength(0);
  });
});
