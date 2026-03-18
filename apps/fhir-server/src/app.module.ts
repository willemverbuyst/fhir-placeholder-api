import { type MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { AllergyIntoleranceModule } from "./AllergyIntolerance/allergy-intolerance.module";
import { AppointmentModule } from "./Appointment/appointment.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConditionModule } from "./Condition/condition.module";
import configuration from "./config/configuration";
import { DataStoreModule } from "./db/dataStore.module";
import { EncounterModule } from "./Encounter/encounter.module";
import { EpisodeOfCareModule } from "./EpisodeOfCare/episode-of-care.module";
import { FlagModule } from "./Flag/flag.module";
import { MetadataModule } from "./metadata/metadata.module";
import { LoggerMiddleware } from "./middlewares/logger.middlewares";
import { ObservationModule } from "./Observation/observation.module";
import { OrganizationModule } from "./Organization/organization.module";
import { PatientModule } from "./Patient/patient.module";
import { PractitionerModule } from "./Practitioner/practitioner.module";
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
    DataStoreModule,
    MetadataModule,
    EncounterModule,
    ObservationModule,
    FlagModule,
    PractitionerRoleModule,
    AppointmentModule,
    ResourceCountsModule,
    ResourceTreeModule,
    AllergyIntoleranceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*path", method: RequestMethod.ALL });
  }
}
