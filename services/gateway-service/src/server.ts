import { apiLimiter } from "@repo/api-limiter";
import { verifyToken } from "@repo/auth-lib";
import { logger } from "@repo/logger";
import cors from "cors";
import express from "express";
import { createProxyServer } from "http-proxy-3";

const proxy = createProxyServer({
  // default options; we’ll pass target per request
});

const log = logger({ application: "gateway-service" });
const authServiceUrl = process.env.AUTH_SERVICE_URL ?? "http://localhost:3001";
const usersServiceUrl = process.env.USER_SERVICE_URL ?? "http://localhost:3002";
const fhirProxyTarget = process.env.FHIR_SERVER_URL ?? "http://localhost:8080";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.get("/ping", (_req, res) => {
  log.info("Ping received");
  res.json({ status: "ok" });
});

app.use("/api", apiLimiter);

// 🔐 Auth middleware
app.use("/api", (req, res, next) => {
  log.info("Request received", { path: req.path });
  if (
    req.path.startsWith("/auth/sign-in") ||
    req.path.startsWith("/auth/sign-up") ||
    req.path.startsWith("/auth/users/list") ||
    req.path === "/public/organizations"
  ) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    log.warn(`Auth rejected: no token ${req.method} ${req.url}`);
    return res.status(401).send("No token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);

    req.headers["x-user-id"] = user.userId;
    req.headers["x-user-role"] = user.role;

    next();
  } catch {
    log.warn(`Auth rejected: invalid token for ${req.method} ${req.url}`);
    return res.status(401).send("Invalid token");
  }
});

// 🔀 Routing

app.use("/api/public/organizations", (req, res) => {
  if (req.method !== "GET") {
    log.warn(`Method not allowed: ${req.method} ${req.url}`);
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method Not Allowed");
  }

  log.info(
    `Proxying request on ${req.url} to ${fhirProxyTarget}/api/v2/r5/Organization/`,
  );
  proxy.web(req, res, { target: `${fhirProxyTarget}/api/v2/r5/Organization/` });
});

app.use("/api/auth/users/list", (req, res) => {
  log.info(`Proxying request on ${req.url} to ${usersServiceUrl}/users`);
  req.url = "/users";
  proxy.web(req, res, { target: usersServiceUrl });
});

app.use("/api/auth", (req, res) => {
  const rewritten = req.url.replace(/^\/api\/auth/, "") || "/";
  log.info(`Proxying request on ${req.url} to ${fhirProxyTarget}${rewritten}`);
  req.url = rewritten;
  proxy.web(req, res, { target: authServiceUrl });
});

app.use("/api/users", (req, res) => {
  const rewritten = req.url.replace(/^\/api\/users/, "") || "/";
  req.url = rewritten;
  log.info(`Proxying request on ${req.url} to ${fhirProxyTarget}${rewritten}`);
  proxy.web(req, res, { target: usersServiceUrl });
});

app.use("/api/fhir/", (req, res) => {
  const rewritten = req.url.replace(/^\/api\/fhir/, "") || "/";
  log.info(
    `Proxying request on ${req.url} to ${fhirProxyTarget}/api/v2/r5"${rewritten}`,
  );
  req.url = rewritten;
  proxy.web(req, res, { target: `${fhirProxyTarget}/api/v2/r5` });
});

app.listen(3000, () => {
  log.info("Gateway service running on port 3000");
});
