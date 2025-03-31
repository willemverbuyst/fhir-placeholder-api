import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FHIR_VERSION_R5 } from './config/version';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v2/' + FHIR_VERSION_R5);

  await app.listen(3000);
}
bootstrap();
