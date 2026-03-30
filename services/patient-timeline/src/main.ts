import http, { type IncomingMessage, type ServerResponse } from "node:http";
import { logger } from "@repo/logger";
import { Cause, Effect, Either, Exit } from "effect";
import {
  FetchError,
  InvalidFhirStructureError,
  PatientNotFoundError,
} from "./errors/errors.js";
import {
  fetchEncounterBundle,
  fetchEpisodeOfCareBundle,
  fetchObservationBundle,
  fetchPatient,
} from "./fhir/client.js";
import { formatName } from "./name/formatNameClient.js";
import { getPatientTimeline } from "./services/timelineService.js";

type Request = IncomingMessage;
type Response = ServerResponse<Request>;
const log = logger({ application: "patient-timeline" });

const sendJson = (res: Response, statusCode: number, body: unknown): void => {
  const json = JSON.stringify(body);

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", Buffer.byteLength(json));
  res.end(json);
};

const getPatientIdFromUrl = (url: string | undefined): string | null => {
  if (url === undefined) {
    return null;
  }

  const parsedUrl = new URL(url, "http://localhost");
  const segments = parsedUrl.pathname.split("/").filter(Boolean);

  if (
    segments.length === 3 &&
    segments[0] === "patient" &&
    segments[2] === "timeline"
  ) {
    return segments[1] ?? null;
  }

  return null;
};

const handleTimelineRequest = (req: Request, res: Response): void => {
  const patientId = getPatientIdFromUrl(req.url);

  if (patientId === null) {
    log.error("Invalid patient timeline URL");
    sendJson(res, 400, { error: "Invalid patient timeline URL" });
    return;
  }

  log.info("Patient timeline request received", { patientId });

  const effect = Effect.gen(function* (_) {
    const patient = yield* _(fetchPatient(patientId));

    const timeline = yield* _(
      getPatientTimeline(
        fetchEncounterBundle,
        fetchObservationBundle,
        fetchEpisodeOfCareBundle,
        patientId,
      ),
    );

    const formattedNameEither = yield* _(
      Effect.either(formatName(patient.name ?? [])),
    );

    const patientName = Either.isRight(formattedNameEither)
      ? formattedNameEither.right
      : null;
    const patientNameWarning = Either.isRight(formattedNameEither)
      ? null
      : "Name formatting unavailable";

    return {
      ...timeline,
      patient: patientName,
      warnings:
        patientNameWarning === null
          ? timeline.warnings
          : [...timeline.warnings, patientNameWarning],
    };
  });

  void Effect.runPromiseExit(effect).then((exit) => {
    if (Exit.isSuccess(exit)) {
      log.info("Patient timeline request completed", { patientId });
      sendJson(res, 200, exit.value);
      return;
    }

    const error = Cause.squash(exit.cause);

    if (error instanceof PatientNotFoundError) {
      log.error("Patient not found", { patientId });
      sendJson(res, 404, {
        error: "Patient not found",
        patientId,
      });
      return;
    }

    if (
      error instanceof FetchError ||
      error instanceof InvalidFhirStructureError
    ) {
      log.error("Failed to fetch or parse FHIR resources", {
        patientId,
        error: error.message,
      });
      sendJson(res, 502, { error: error.message });
      return;
    }

    log.error("Unexpected error while building patient timeline", {
      patientId,
      error,
    });
    sendJson(res, 500, { error: "Unexpected error" });
  });
};

const handleRequest = (req: Request, res: Response): void => {
  if (req.method === "GET") {
    if (req.url === "/") {
      sendJson(res, 200, { msg: "patient timeline service" });
      return;
    }

    if (req.url?.startsWith("/patient/") && req.url.includes("/timeline")) {
      handleTimelineRequest(req, res);
      return;
    }
  }

  res.statusCode = 404;
  res.end();
};

const serverEffect = Effect.sync(() => {
  const server = http.createServer(handleRequest);
  const port = 4001;

  server.listen(port, () => {
    log.info(`Server listening on http://localhost:${port}`);
  });
});

Effect.runPromise(serverEffect).catch((error) => {
  log.error("Server failed to start", { error });
  process.exit(1);
});
