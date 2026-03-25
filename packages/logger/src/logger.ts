import { createLogger, format, transports } from "winston";

export const logger = ({ application }: { application: string }) => {
  return createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
    defaultMeta: {
      application,
    },
  });
};
