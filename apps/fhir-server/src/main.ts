import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AppModule } from "./app.module";
import { LoggerService } from "./common/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const fhirVersion = app.get(ConfigService).get("fhirVersion");
  if (!fhirVersion) {
    throw new Error("fhirVersion is not defined");
  }

  const serverVersion = app.get(ConfigService).get("serverVersion");
  if (!serverVersion) {
    throw new Error("serverVersion is not defined");
  }

  app.use(helmet());
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

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const config = new DocumentBuilder()
    .setTitle("Fhir R5 API")
    .setDescription("Server with dummy data for FHIR R5")
    .setVersion("2.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  const port = app.get(ConfigService).get("PORT") || 8080;
  await app.listen(port, () => {
    app
      .get(WINSTON_MODULE_NEST_PROVIDER)
      .log(`Server is running on port ${port}`);
  });
}
bootstrap();
