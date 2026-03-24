import winston from "winston";

export const logger = ({
  service,
  level = "info",
}: {
  service: string;
  level?: string;
}) => {
  return winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [new winston.transports.Console()],
    defaultMeta: {
      service,
    },
  });
};
