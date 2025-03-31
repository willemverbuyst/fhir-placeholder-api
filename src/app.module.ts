import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { LoggerMiddleware } from './middlewares/logger.middlewares';
import { OrganizationsModule } from './organizations/organizations.module';
import { PatientsModule } from './patients/patients.module';
import { PractitionersModule } from './practitioners/practitioners.module';
import { ConditionsModule } from './conditions/conditions.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // to use ConfigModule in other modules set isGlobal to true
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
      load: [configuration],
    }),
    OrganizationsModule,
    PatientsModule,
    PractitionersModule,
    ConditionsModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
