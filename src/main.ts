import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const fhirVersion = app.get(ConfigService).get('fhirVersion');
  if (!fhirVersion) {
    throw new Error('fhirVersion is not defined');
  }

  app.enableCors();
  app.setGlobalPrefix('api/v2/' + fhirVersion);

  // whitelist: true will strip properties that are not in the DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = app.get(ConfigService).get('PORT') || 3000;
  await app.listen(port, () => {
    console.log(
      `Server is running on http://localhost:${port}/api/v2/${fhirVersion}`,
    );
  });
}
bootstrap();
