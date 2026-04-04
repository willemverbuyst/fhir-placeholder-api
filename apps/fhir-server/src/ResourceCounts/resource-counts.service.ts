import { Injectable } from "@nestjs/common";
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
export class ResourceCountsService {
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

  async getResourceCounts(): Promise<Record<string, number>> {
    return {
      patients: await this.patientRepo.count(),
      episodes: await this.episodeOfCareRepo.count(),
      conditions: await this.conditionRepo.count(),
      organizations: await this.organizationRepo.count(),
      practitioners: await this.practitionerRepo.count(),
      practitionerRoles: await this.practitionerRoleRepo.count(),
      encounters: await this.encounterRepo.count(),
      observations: await this.observationRepo.count(),
      appointments: await this.appointmentRepo.count(),
      allergies: await this.allergyIntoleranceRepo.count(),
      communications: await this.communicationRepo.count(),
      flags: await this.flagRepo.count(),
    };
  }
}
