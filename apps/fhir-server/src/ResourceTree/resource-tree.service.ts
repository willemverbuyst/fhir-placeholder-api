import { Injectable } from "@nestjs/common";
import * as R from "remeda";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AllergyIntolerance } from "src/AllergyIntolerance/allergy-intolerance.entity";
import { Appointment } from "src/Appointment/appointment.entity";
import { Communication } from "src/Communication/communication.entity";
import { Condition } from "src/Condition/condition.entity";
import { Encounter } from "src/Encounter/encounter.entity";
import { EpisodeOfCare } from "src/EpisodeOfCare/episode-of-care.entity";
import { Flag } from "src/Flag/flag.entity";
import { Observation } from "src/Observation/observation.entity";
import { Organization } from "src/Organization/organization.entity";
import { Patient } from "src/Patient/patient.entity";
import { Practitioner } from "src/Practitioner/practitioner.entity";
import { PractitionerRole } from "src/PractitionerRole/practitioner-role.entity";

@Injectable()
export class ResourceTreeService {
  constructor(
    @InjectRepository(AllergyIntolerance)
    private allergyIntoleranceRepo: Repository<AllergyIntolerance>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Communication)
    private communicationRepo: Repository<Communication>,
    @InjectRepository(Condition)
    private conditionRepo: Repository<Condition>,
    @InjectRepository(Encounter)
    private encounterRepo: Repository<Encounter>,
    @InjectRepository(EpisodeOfCare)
    private episodeOfCareRepo: Repository<EpisodeOfCare>,
    @InjectRepository(Flag)
    private flagRepo: Repository<Flag>,
    @InjectRepository(Observation)
    private observationRepo: Repository<Observation>,
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(Practitioner)
    private practitionerRepo: Repository<Practitioner>,
    @InjectRepository(PractitionerRole)
    private practitionerRoleRepo: Repository<PractitionerRole>,
  ) {}

  async generateTree(): Promise<Record<string, unknown>> {
    const observations = await this.observationRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const communications = await this.communicationRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const flags = await this.flagRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const allergies = await this.allergyIntoleranceRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const encounters = await this.encounterRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const episodes = await this.episodeOfCareRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const conditions = await this.conditionRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const appointments = await this.appointmentRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const patients = await this.patientRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const practitioners = await this.practitionerRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const practitionerRoles = await this.practitionerRoleRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));
    const organizations = await this.organizationRepo
      .find()
      .then((entities) => entities.map((entity) => entity.resource));

    const obsByEncounter = R.groupBy(
      observations,
      (observation) => observation.encounter?.reference,
    );

    const communicationsByEncounter = R.groupBy(
      communications,
      (communication) => communication.encounter?.reference,
    );

    const flagsByEncounter = R.groupBy(
      flags,
      (flag) => flag.encounter?.reference,
    );

    const allergiesByEncounter = R.groupBy(
      allergies,
      (allergy) => allergy.encounter?.reference ?? "unknown",
    );

    const encountersByEpisode = R.groupBy(
      encounters,
      (encounter) => encounter.episodeOfCare?.[0]?.reference ?? "unknown",
    );

    const episodesByCondition = R.groupBy(
      episodes,
      (episode) =>
        episode.diagnosis?.[0]?.condition?.[0].reference?.reference ??
        "unknown",
    );

    const conditionsByPatient = R.groupBy(
      conditions,
      (condition) => condition.subject?.reference ?? "unknown",
    );

    const appointmentsByPatient = R.groupBy(
      appointments,
      (appointment) => appointment.subject?.reference ?? "unknown",
    );

    const patientsByPractitioner = R.groupBy(
      patients,
      (patient) => patient.generalPractitioner?.[0]?.reference ?? "unknown",
    );

    const practitionersByPractitionerRoles = R.groupBy(
      practitioners,
      (practitioner) =>
        `PractitionerRole/${
          practitionerRoles.find(
            (pr) =>
              pr.practitioner?.reference?.split("/")[1] === practitioner.id,
          )?.id
        }`,
    );

    const practitionerRolesByOrganization = R.groupBy(
      practitionerRoles,
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

    const organizationTree = organizations.map((organization) => ({
      name: `Organization/${organization.id}`,
      children: practitionerRoleTree[`Organization/${organization.id}`],
    }));

    return { name: "tree", children: organizationTree };
  }
}
