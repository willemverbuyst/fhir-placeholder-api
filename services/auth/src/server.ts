import { signToken } from "@repo/auth-lib";
import { logger } from "@repo/logger";
import bcrypt from "bcrypt";
import express from "express";
import { pool } from "./db";

const log = logger({ service: "auth" });

const app = express();
app.use(express.json());

// fake DB for now
const users = [
  {
    id: "1",
    username: "foo",
    passwordHash: bcrypt.hashSync("bar", 10),
    role: "admin",
  },
];

app.post("/login", async (req, res) => {
  log.info("User is attempting to login");
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    log.error("User not found");
    return res.status(401).send("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    log.error("Invalid credentials");
    return res.status(401).send("Invalid credentials");
  }

  const token = signToken({ userId: user.id, role: user.role });

  log.info("User logged in successfully");
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
  log.info("Auth running on 3001");
});
