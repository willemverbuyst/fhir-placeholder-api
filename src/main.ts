import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const fhirVersion = app.get(ConfigService).get('fhirVersion');
  if (!fhirVersion) {
    throw new Error('fhirVersion is not defined');
  }

  const serverVersion = app.get(ConfigService).get('serverVersion');
  if (!serverVersion) {
    throw new Error('serverVersion is not defined');
  }

  app.enableCors();
  app.setGlobalPrefix(`api/${serverVersion}/${fhirVersion}`);

  // whitelist: true will strip properties that are not in the DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Fhir R5 API')
    .setDescription('Server with dummy data for FHIR R5')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = app.get(ConfigService).get('PORT') || 3000;
  await app.listen(port, () => {
    console.log(
      `Server is running on http://localhost:${port}/api/v2/${fhirVersion}`,
    );
  });
}
bootstrap();
