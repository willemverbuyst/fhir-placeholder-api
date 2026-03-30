import { apiLimiter } from "@repo/api-limiter";
import { logger } from "@repo/logger";
import express from "express";
import { pool } from "./db";

const log = logger({ application: "users-service" });

const app = express();

app.get("/me", (req, res) => {
  log.info("User is attempting to get their data");
  const userId = req.headers["x-user-id"];
  const role = req.headers["x-user-role"];

  log.info(`Data returned to user with id ${userId}`);
  res.json({
    message: "User data",
    userId,
    role,
  });
});

app.get("/users", apiLimiter, async (_req, res) => {
  try {
    log.info("Attempting to list users");
    const result = await pool.query("SELECT username, role FROM users");
    log.info("Users listed successfully", { count: result.rowCount });
    res.json({ users: result.rows });
  } catch (error) {
    log.error("Error listing users", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3002, () => {
  log.info("Users service running on port 3002");
});
