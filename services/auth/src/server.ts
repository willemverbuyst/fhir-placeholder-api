import { signToken } from "@repo/auth-lib";
import bcrypt from "bcrypt";
import express from "express";

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
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).send("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).send("Invalid credentials");

  const token = signToken({ userId: user.id, role: user.role });

  res.json({ token });
});

app.listen(3001, () => {
  console.log("Auth running on 3001");
});
