import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConditionModule } from './Condition/condition.module';
import configuration from './config/configuration';
import { DataStoreModule } from './db/dataStore.module';
import { EpisodeOfCareModule } from './EpisodeOfCare/episode-of-care.module';
import { MetadataModule } from './metadata/metadata.module';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { OrganizationModule } from './Organization/organization.module';
import { PatientsModule } from './patients/patients.module';
import { PractitionersModule } from './practitioners/practitioners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // to use ConfigModule in other modules set isGlobal to true
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
      load: [configuration],
    }),
    OrganizationModule,
    PatientsModule,
    PractitionersModule,
    ConditionModule,
    EpisodeOfCareModule,
    DataStoreModule,
    MetadataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
