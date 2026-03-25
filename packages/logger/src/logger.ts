import { createLogger, format, transports } from "winston";

export const logger = ({ service }: { service: string }) => {
  return createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
    defaultMeta: {
      service,
    },
  });
};
