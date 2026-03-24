import { signToken } from "@repo/auth-lib";
import { logger } from "@repo/logger";
import bcrypt from "bcrypt";
import express from "express";
import { pool } from "./db";

const log = logger({ service: "auth" });

const app = express();
app.use(express.json());

app.post("/sign-in", async (req, res) => {
  log.info("User is attempting to sign in");
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT id, role, password FROM users WHERE username = $1",
    [username],
  );
  const user = result.rows[0];
  if (!user) {
    log.error("User not found");
    return res.status(401).send("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    log.error("Invalid credentials");
    return res.status(401).send("Invalid credentials");
  }

  const token = signToken({ userId: user.id, role: user.role });

  log.info("User signed in successfully");
  res.json({ token });
});

app.post("/sign-up", async (req, res) => {
  log.info("User is attempting to sign up");
  const { username, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role, created_at",
    [username, passwordHash, role],
  );
  const user = result.rows[0];
  log.info("User signed up successfully");
  res.json({ user });
});

app.listen(3001, () => {
  log.info("Auth service running on port 3001");
});
