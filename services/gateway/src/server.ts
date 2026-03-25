import { verifyToken } from "@repo/auth-lib";
import { logger } from "@repo/logger";
import express from "express";
import rateLimit from "express-rate-limit";
import { createProxyServer } from "http-proxy-3";

const proxy = createProxyServer({
  // default options; we’ll pass target per request
});

const log = logger({ service: "gateway" });
const authServiceUrl = process.env.AUTH_SERVICE_URL ?? "http://localhost:3001";
const usersServiceUrl =
  process.env.USERS_SERVICE_URL ?? "http://localhost:3002";
const fhirProxyTarget = process.env.FHIR_PROXY_TARGET;

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/api", apiLimiter);

// 🔐 Auth middleware
app.use("/api", (req, res, next) => {
  log.info("Request received", { path: req.path });
  if (req.path.startsWith("/auth/sign-in")) return next();

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
    log.warn(`[gateway] auth rejected: invalid token ${req.method} ${req.url}`);
    return res.status(401).send("Invalid token");
  }
});

// 🔀 Routing

app.use("/api/auth", (req, res) => {
  const rewritten = req.url.replace(/^\/api\/auth/, "") || "/";
  req.url = rewritten;
  proxy.web(req, res, { target: authServiceUrl });
});

app.use("/api/users", (req, res) => {
  const rewritten = req.url.replace(/^\/api\/users/, "") || "/";
  req.url = rewritten;
  proxy.web(req, res, { target: usersServiceUrl });
});

if (fhirProxyTarget) {
  app.use("/api/fhir/", (req, res) => {
    const rewritten = req.url.replace(/^\/api\/fhir/, "") || "/";
    req.url = rewritten;
    proxy.web(req, res, { target: fhirProxyTarget });
  });
}

app.listen(3000, () => {
  log.info("Gateway service running on port 3000");
});
