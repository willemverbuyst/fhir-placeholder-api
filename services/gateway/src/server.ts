import { verifyToken } from "@repo/auth-lib";
import { logger } from "@repo/logger";
import express from "express";
import rateLimit from "express-rate-limit";
import { createProxyMiddleware } from "http-proxy-middleware";

const log = logger({ service: "gateway" });

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
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3001",
    pathRewrite: { "^/api/auth": "" },
    logger: log,
  }),
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:3002",
    pathRewrite: { "^/api/users": "" },
    logger: log,
  }),
);

app.use(
  "/api/fhir/",
  createProxyMiddleware({
    target: "http://localhost:8080/api/v2/r5/",
    pathRewrite: { "^/api/fhir/": "" },
    logger: log,
  }),
);

app.listen(3000, () => {
  log.info("Gateway service running on port 3000");
});
