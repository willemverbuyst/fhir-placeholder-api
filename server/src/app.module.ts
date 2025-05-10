import { type MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { AppointmentModule } from "./Appointment/appointment.module";
import { ConditionModule } from "./Condition/condition.module";
import { EncounterModule } from "./Encounter/encounter.module";
import { EpisodeOfCareModule } from "./EpisodeOfCare/episode-of-care.module";
import { ObservationModule } from "./Observation/observation.module";
import { OrganizationModule } from "./Organization/organization.module";
import { PatientModule } from "./Patient/patient.module";
import { PractitionerModule } from "./Practitioner/practitioner.module";
import { PractitionerRoleModule } from "./PractitionerRole/practitioner-role.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { DataStoreModule } from "./db/dataStore.module";
import { MetadataModule } from "./metadata/metadata.module";
import { LoggerMiddleware } from "./middlewares/logger.middlewares";

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
    PractitionerRoleModule,
    AppointmentModule,
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
