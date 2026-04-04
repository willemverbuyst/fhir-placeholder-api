import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import { AllergyIntolerance } from "./AllergyIntolerance/allergy-intolerance.entity";
import { AllergyIntoleranceModule } from "./AllergyIntolerance/allergy-intolerance.module";
import { Appointment } from "./Appointment/appointment.entity";
import { AppointmentModule } from "./Appointment/appointment.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Communication } from "./Communication/communication.entity";
import { CommunicationModule } from "./Communication/communication.module";
import { Condition } from "./Condition/condition.entity";
import { ConditionModule } from "./Condition/condition.module";
import configuration from "./config/configuration";
import { Encounter } from "./Encounter/encounter.entity";
import { EncounterModule } from "./Encounter/encounter.module";
import { EpisodeOfCare } from "./EpisodeOfCare/episode-of-care.entity";
import { EpisodeOfCareModule } from "./EpisodeOfCare/episode-of-care.module";
import { Flag } from "./Flag/flag.entity";
import { FlagModule } from "./Flag/flag.module";
import { winstonConfig } from "./logging/logging.config";
import { MetadataModule } from "./metadata/metadata.module";
import { Observation } from "./Observation/observation.entity";
import { ObservationModule } from "./Observation/observation.module";
import { Organization } from "./Organization/organization.entity";
import { OrganizationModule } from "./Organization/organization.module";
import { Patient } from "./Patient/patient.entity";
import { PatientModule } from "./Patient/patient.module";
import { Practitioner } from "./Practitioner/practitioner.entity";
import { PractitionerModule } from "./Practitioner/practitioner.module";
import { PractitionerRole } from "./PractitionerRole/practitioner-role.entity";
import { PractitionerRoleModule } from "./PractitionerRole/practitioner-role.module";
import { ResourceCountsModule } from "./ResourceCounts/resource-counts.module";
import { ResourceTreeModule } from "./ResourceTree/resource-tree.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      // to use ConfigModule in other modules set isGlobal to true
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV ?? "development"}`,
      load: [configuration],
    }),
    OrganizationModule,
    PatientModule,
    PractitionerModule,
    ConditionModule,
    EpisodeOfCareModule,
    MetadataModule,
    EncounterModule,
    ObservationModule,
    FlagModule,
    CommunicationModule,
    PractitionerRoleModule,
    AppointmentModule,
    ResourceCountsModule,
    ResourceTreeModule,
    AllergyIntoleranceModule,
    WinstonModule.forRoot(winstonConfig),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "fhir-data-db",
      // host: process.env.DB_HOST || "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "fhir_db",
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only for dev
      entities: [
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
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
