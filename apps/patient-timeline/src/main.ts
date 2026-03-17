import http, { type IncomingMessage, type ServerResponse } from "node:http";
import { Cause, Effect, Exit } from "effect";
import {
  FetchError,
  InvalidFhirStructureError,
  PatientNotFoundError,
} from "./errors/errors.js";
import {
  fetchEncounterBundle,
  fetchObservationBundle,
  fetchPatient,
} from "./fhir/client.js";
import { getPatientTimeline } from "./services/timelineService.js";

type Request = IncomingMessage;
type Response = ServerResponse<Request>;

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
    sendJson(res, 400, { error: "Invalid patient timeline URL" });
    return;
  }

  const effect = Effect.gen(function* (_) {
    yield* _(fetchPatient(patientId));

    const timeline = yield* _(
      getPatientTimeline(
        fetchEncounterBundle,
        fetchObservationBundle,
        patientId,
      ),
    );

    return timeline;
  });

  void Effect.runPromiseExit(effect).then((exit) => {
    if (Exit.isSuccess(exit)) {
      sendJson(res, 200, exit.value);
      return;
    }

    const error = Cause.squash(exit.cause);

    if (error instanceof PatientNotFoundError) {
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
      sendJson(res, 502, { error: error.message });
      return;
    }

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
  const port = 4000;

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
  });
});

Effect.runPromise(serverEffect).catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Server failed to start", error);
  process.exit(1);
});
