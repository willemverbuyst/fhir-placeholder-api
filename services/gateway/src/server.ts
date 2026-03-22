import { verifyToken } from "@repo/auth-lib";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// 🔐 Auth middleware
app.use("/api", (req, res, next) => {
  if (req.path.startsWith("/auth")) return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("No token");

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);

    req.headers["x-user-id"] = user.userId;
    req.headers["x-user-role"] = user.role;

    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
});

// 🔀 Routing
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "" },
  }),
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: { "^/api/users": "" },
  }),
);

app.listen(3000, () => {
  console.log("Gateway running on 3000");
});
