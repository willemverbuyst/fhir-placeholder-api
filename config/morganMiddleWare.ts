// @ts-types="npm:@types/morgan@1.9.9"
import morgan, { StreamOptions } from "npm:morgan";
import Logger from "../lib/logger.ts";

// Override the stream method by telling
// Morgan to use the custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message?.replace(/\n$/, "")),
};

const skip = () => {
  const env = "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
