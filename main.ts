// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { Low, Memory } from "npm:lowdb";
import morganMiddleware from "./config/morganMiddleWare.ts";
import { seedDB } from "./seed.ts";
import { Data } from "./types.ts";

// Setup adapter and database
const adapter = new Memory<Data>();
const defaultData: Data = { patients: [], episodes: [], conditions: [] };
const db = new Low<Data>(adapter, defaultData);

// Initialize database
await db.read();
seedDB(db);

const app = express();

app.use(morganMiddleware);

app.get("/", (_, res) => {
  res.send("Fhir Placeholder Api");
});

app.get("/patients", (_, res) => {
  const patients = db.data.patients;

  res.send({ status: "success", lengtt: patients.length, data: patients });
});

app.get("/patients/:id", (req, res) => {
  const patient = db.data.patients.find((p) => p.id === req.params.id);

  if (!patient) {
    res
      .status(404)
      .send({ status: "fail", data: null, message: "patient not found" });
  } else {
    res.send({ status: "success", data: patient });
  }
});

app.get("/episodes", (_, res) => {
  const episodes = db.data.episodes;

  res.send({ status: "success", lengtt: episodes.length, data: episodes });
});

app.get("/episodes/:id", (req, res) => {
  const episode = db.data.episodes.find((e) => e.id === req.params.id);
  if (!episode) {
    res.status(404).send({
      status: "fail",
      data: null,
      message: "episode of care not found",
    });
  } else {
    res.send({ status: "success", data: episode });
  }
});

app.get("/conditions", (_, res) => {
  const conditions = db.data.conditions;

  res.send({ status: "success", lengtt: conditions.length, data: conditions });
});

app.get("/conditions/:id", (req, res) => {
  const condition = db.data.conditions.find((c) => c.id === req.params.id);

  if (!condition) {
    res.status(404).send({
      status: "fail",
      data: null,
      message: "condition not found",
    });
  } else {
    res.send({ status: "success", data: condition });
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
