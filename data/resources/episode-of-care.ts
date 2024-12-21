import { faker } from "npm:@faker-js/faker";
import { EpisodeOfCareWithId } from "../../models/data.ts";

export function createEpisode(
  patientId: string,
  episodeId: number,
  conditionId: string
) {
  const newEpisode: EpisodeOfCareWithId = {
    id: episodeId.toString(),
    resourceType: "EpisodeOfCare",
    status: faker.helpers.arrayElement([
      "planned",
      "waitlist",
      "active",
      "onhold",
      "finished",
      "cancelled",
      "entered-in-error",
    ]),
    patient: { reference: `Patient/${patientId}` },
    diagnosis: [
      {
        condition: [
          {
            reference: { reference: `Condition/${conditionId}` },
          },
        ],
      },
    ],
  };

  return newEpisode;
}
