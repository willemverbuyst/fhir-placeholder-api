import { logger } from "@repo/logger";
import express from "express";

const log = logger({ service: "users" });

const app = express();

app.get("/me", (req, res) => {
  log.info("User is attempting to get their data");
  const userId = req.headers["x-user-id"];
  const role = req.headers["x-user-role"];

  res.json({
    message: "User data",
    userId,
    role,
  });
});

app.listen(3002, () => {
  log.info("Users service running on port 3002");
});
