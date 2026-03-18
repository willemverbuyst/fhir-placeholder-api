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

    const communicationsByEncounter = R.groupBy(
      this.repo.communications,
      (communication) => communication.encounter?.reference,
    );

    const flagsByEncounter = R.groupBy(
      this.repo.flags,
      (flag) => flag.encounter?.reference,
    );

    const allergiesByEncounter = R.groupBy(
      this.repo.allergies,
      (allergy) => allergy.encounter?.reference ?? "unknown",
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

    const appointmentsByPatient = R.groupBy(
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
      encounters.map((encounter) => ({
        name: `Encounter/${encounter.id}`,
        children: [
          ...(allergiesByEncounter[`Encounter/${encounter.id}`]?.map(
            (allergy) => ({
              name: `AllergyIntolerance/${allergy.id}`,
              children: [],
            }),
          ) || []),
          ...(obsByEncounter[`Encounter/${encounter.id}`]?.map((obs) => ({
            name: `Observation/${obs.id}`,
            children: [],
          })) || []),
          ...(communicationsByEncounter[`Encounter/${encounter.id}`]?.map(
            (communication) => ({
              name: `Communication/${communication.id}`,
              children: [],
            }),
          ) || []),
          ...(flagsByEncounter[`Encounter/${encounter.id}`]?.map((flag) => ({
            name: `Flag/${flag.id}`,
            children: [],
          })) || []),
        ],
      })),
    );

    const episodeTree = R.mapValues(episodesByCondition, (episodes) =>
      episodes.map((episode) => ({
        name: `EpisodeOfCare/${episode.id}`,
        children: encounterTree[`EpisodeOfCare/${episode.id}`] || [],
      })),
    );

    const conditionTree = R.mapValues(conditionsByPatient, (conditions) =>
      conditions.map((condition) => ({
        name: `Condition/${condition.id}`,
        children: episodeTree[`Condition/${condition.id}`] || [],
      })),
    );

    const appointmentTree = R.mapValues(appointmentsByPatient, (appointments) =>
      appointments.map((appointment) => ({
        name: `Appointment/${appointment.id}`,
        children: [],
      })),
    );

    const patientTree = R.mapValues(patientsByPractitioner, (patients) =>
      patients.map((patient) => ({
        name: `Patient/${patient.id}`,
        children:
          R.concat(
            conditionTree[`Patient/${patient.id}`],
            appointmentTree[`Patient/${patient.id}`],
          ) || [],
      })),
    );

    const practitionerTree = R.mapValues(
      practitionersByPractitionerRoles,
      (practitioners) =>
        practitioners.map((practitioner) => ({
          name: `Practitioner/${practitioner.id}`,
          children: patientTree[`Practitioner/${practitioner.id}`] || [],
        })),
    );

    const practitionerRoleTree = R.mapValues(
      practitionerRolesByOrganization,
      (practitionerRoles) =>
        practitionerRoles.map((practitionerRole) => ({
          name: `PractitionerRole/${practitionerRole.id}`,
          children: practitionerTree[`PractitionerRole/${practitionerRole.id}`],
        })),
    );

    const organizationTree = this.repo.organizations.map((organization) => ({
      name: `Organization/${organization.id}`,
      children: practitionerRoleTree[`Organization/${organization.id}`],
    }));

    return { name: "tree", children: organizationTree };
  }
}
