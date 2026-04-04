import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import { AllergyIntoleranceModule } from "./AllergyIntolerance/allergy-intolerance.module";
import { AppointmentModule } from "./Appointment/appointment.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommunicationModule } from "./Communication/communication.module";
import { ConditionModule } from "./Condition/condition.module";
import configuration from "./config/configuration";
import { DataStoreModule } from "./db/dataStore.module";
import { EncounterModule } from "./Encounter/encounter.module";
import { EpisodeOfCareModule } from "./EpisodeOfCare/episode-of-care.module";
import { FlagModule } from "./Flag/flag.module";
import { winstonConfig } from "./logging/logging.config";
import { MetadataModule } from "./metadata/metadata.module";
import { ObservationModule } from "./Observation/observation.module";
import { OrganizationModule } from "./Organization/organization.module";
import { PatientModule } from "./Patient/patient.module";
import { PractitionerModule } from "./Practitioner/practitioner.module";
import { PractitionerRoleModule } from "./PractitionerRole/practitioner-role.module";
import { ResourceCountsModule } from "./ResourceCounts/resource-counts.module";
import { ResourceTreeModule } from "./ResourceTree/resource-tree.module";
import { DataSource } from "typeorm";
import { Organization } from "./Organization/organization.entity";
import { AllergyIntolerance } from "./AllergyIntolerance/allergy-intolerance.entity";
import { Patient } from "./Patient/patient.entity";
import { Appointment } from "./Appointment/appointment.entity";
import { Communication } from "./Communication/communication.entity";
import { Condition } from "./Condition/condition.entity";
import { Encounter } from "./Encounter/encounter.entity";
import { EpisodeOfCare } from "./EpisodeOfCare/episode-of-care.entity";
import { Flag } from "./Flag/flag.entity";
import { Observation } from "./Observation/observation.entity";
import { PractitionerRole } from "./PractitionerRole/practitioner-role.entity";
import { Practitioner } from "./Practitioner/practitioner.entity";

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
    DataStoreModule,
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
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
