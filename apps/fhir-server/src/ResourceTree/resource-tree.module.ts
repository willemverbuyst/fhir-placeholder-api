import { Module } from "@nestjs/common";
import { ResourceTreeController } from "./resource-tree.controller";
import { ResourceTreeService } from "./resource-tree.service";
import { TypeOrmModule } from "@nestjs/typeorm";
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AllergyIntolerance,
      Appointment,
      Communication,
      Condition,
      Encounter,
      EpisodeOfCare,
      Flag,
      Observation,
      Organization,
      Patient,
      Practitioner,
      PractitionerRole,
    ]),
  ],
  controllers: [ResourceTreeController],
  providers: [ResourceTreeService],
})
export class ResourceTreeModule {}
