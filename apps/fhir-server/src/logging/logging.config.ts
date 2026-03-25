// logger.config.ts
import * as winston from "winston";

export const winstonConfig: winston.LoggerOptions = {
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
  defaultMeta: {
    application: "fhir-server",
  },
};
