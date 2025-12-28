import { Injectable } from "@nestjs/common";
import * as R from "remeda";
import { DataStoreService } from "../db/dataStore.service";

@Injectable()
export class ResourceTreeService {
  constructor(private readonly repo: DataStoreService) {}

  async generateTree(): Promise<Record<string, unknown>> {
    const obsByEncounter = R.groupBy(
      this.repo.observations,
      (observation) => observation.encounter?.reference,
    );

    const encountersByEpisode = R.groupBy(
      this.repo.encounters,
      (encounter) => encounter.episodeOfCare?.[0]?.reference ?? "unknown",
    );

    const episodesByCondition = R.groupBy(
      this.repo.episodes,
      (episode) =>
        episode.diagnosis?.[0]?.condition?.[0].reference?.reference ??
        "unknown",
    );

    const conditionsByPatient = R.groupBy(
      this.repo.conditions,
      (condition) => condition.subject?.reference ?? "unknown",
    );

    const patientsByPractitioner = R.groupBy(
      this.repo.patients,
      (patient) => patient.generalPractitioner?.[0]?.reference ?? "unknown",
    );

    const practitionersByPractitionerRoles = R.groupBy(
      this.repo.practitioners,
      (practitioner) =>
        `PractitionerRole/${
          this.repo.practitionerRoles.find(
            (pr) =>
              pr.practitioner?.reference?.split("/")[1] === practitioner.id,
          )?.id
        }`,
    );

    const practitionerRolesByOrganization = R.groupBy(
      this.repo.practitionerRoles,
      (role) => role.organization?.reference ?? "unknown",
    );

    const encounterTree = R.mapValues(encountersByEpisode, (encounters) =>
      encounters.map((enc) => ({
        [`Encounter/${enc.id ?? "unknown"}`]:
          obsByEncounter[`Encounter/${enc.id}`].map(
            (obs) => `Observation/${obs.id}`,
          ) || [],
      })),
    );

    const episodeTree = R.mapValues(episodesByCondition, (episodes) =>
      episodes.map((ep) => ({
        [`EpisodeOfCare/${ep.id ?? "unknown"}`]:
          encounterTree[`EpisodeOfCare/${ep.id}`] || [],
      })),
    );

    const conditionTree = R.mapValues(conditionsByPatient, (conditions) =>
      conditions.map((cond) => ({
        [`Condition/${cond.id ?? "unknown"}`]:
          episodeTree[`Condition/${cond.id}`] || [],
      })),
    );

    const patientTree = R.mapValues(patientsByPractitioner, (patients) =>
      patients.map((pat) => ({
        [`Patient/${pat.id ?? "unknown"}`]:
          conditionTree[`Patient/${pat.id}`] || [],
      })),
    );

    const practitionerTree = R.mapValues(
      practitionersByPractitionerRoles,
      (practitioners) =>
        practitioners.map((practitioner) => ({
          [`Practitioner/${practitioner.id}`]:
            patientTree[`Practitioner/${practitioner.id}`] || [],
        })),
    );

    const practitionerRoleTree = R.mapValues(
      practitionerRolesByOrganization,
      (practitionerRoles) =>
        practitionerRoles.map((practitionerRole) => ({
          [`PractitionerRole/${practitionerRole.id}`]:
            practitionerTree[`PractitionerRole/${practitionerRole.id}`],
        })),
    );

    return { tree: practitionerRoleTree };
  }
}
