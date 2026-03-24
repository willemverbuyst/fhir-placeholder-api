import { verifyToken } from "@repo/auth-lib";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";

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
  if (req.path.startsWith("/auth/login")) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn(`[gateway] auth rejected: no token ${req.method} ${req.url}`);
    return res.status(401).send("No token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);

    req.headers["x-user-id"] = user.userId;
    req.headers["x-user-role"] = user.role;

    next();
  } catch {
    console.warn(
      `[gateway] auth rejected: invalid token ${req.method} ${req.url}`,
    );
    return res.status(401).send("Invalid token");
  }
});

// 🔀 Routing
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3001",
    pathRewrite: { "^/api/auth": "" },
    logger: console,
  }),
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:3002",
    pathRewrite: { "^/api/users": "" },
    logger: console,
  }),
);

app.use(
  "/api/fhir/",
  createProxyMiddleware({
    target: "http://localhost:8080/api/v2/r5/",
    pathRewrite: { "^/api/fhir/": "" },
    logger: console,
  }),
);

app.listen(3000, () => {
  console.log("Gateway service on 3000");
});
