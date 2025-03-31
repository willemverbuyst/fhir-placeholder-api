import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const FHIR_VERSION = app.get(ConfigService).get('FHIR_VERSION');
  if (!FHIR_VERSION) {
    throw new Error('FHIR_VERSION is not defined');
  }

  app.enableCors();
  app.setGlobalPrefix('api/v2/' + FHIR_VERSION);

  const PORT = app.get(ConfigService).get('PORT') || 3000;
  await app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}/api/v2/${FHIR_VERSION}`,
    );
  });
}
bootstrap();
