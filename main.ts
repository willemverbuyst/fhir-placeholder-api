// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { Low } from "npm:lowdb";
import { JSONFile } from "npm:lowdb/node";
import morganMiddleware from "./config/morganMiddleWare.ts";
import { seedDB } from "./seed.ts";
import { Data } from "./types.ts";

// Setup adapter and database
const adapter = new JSONFile<Data>("db.json");
const defaultData: Data = { patients: [], episodes: [], conditions: [] };
const db = new Low<Data>(adapter, defaultData);

// Initialize database
await db.read();
seedDB(db);

const app = express();

app.use(morganMiddleware);

app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.get("/patients", (_, res) => {
  const patients = db.data.patients;
  res.send(patients);
});

app.get("/patients/:id", (req, res) => {
  const patient = db.data.patients.find((p) => p.id === req.params.id);
  res.send(patient);
});

app.get("/episodes", (_, res) => {
  const episodes = db.data.episodes;
  res.send(episodes);
});

app.get("/conditions", (_, res) => {
  const conditions = db.data.conditions;
  res.send(conditions);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
