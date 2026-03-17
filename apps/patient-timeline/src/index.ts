import http, { type IncomingMessage, type ServerResponse } from "http";
import { Effect } from "effect";

type Request = IncomingMessage;
type Response = ServerResponse<Request>;

const handleRequest = (req: Request, res: Response): void => {
  if (req.method === "GET" && req.url === "/") {
    const body = JSON.stringify({ msg: "hello world" });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Length", Buffer.byteLength(body));
    res.end(body);

    return;
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
