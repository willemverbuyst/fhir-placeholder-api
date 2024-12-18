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
  try {
    const patients = db.data.patients;

    res.send({ status: "success", lengtt: patients.length, data: patients });
  } catch (error) {
    console.error("Error fetching patients", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.get("/patients/:id", (req, res) => {
  try {
    const patient = db.data.patients.find((p) => p.id === req.params.id);

    if (!patient) {
      res
        .status(404)
        .send({ status: "fail", data: null, message: "patient not found" });
    } else {
      res.send({ status: "success", data: patient });
    }
  } catch (error) {
    console.error("Error fetching patient", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.get("/patients/:id/episodes", (req, res) => {
  try {
    const episodes = db.data.episodes.filter(
      (e) => e.patient.reference?.split("/")[1] === req.params.id
    );

    res.send({ status: "success", lengtt: episodes.length, data: episodes });
  } catch (error) {
    console.error("Error fetching patient", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.get("/episodes", (_, res) => {
  try {
    const episodes = db.data.episodes;

    res.send({ status: "success", lengtt: episodes.length, data: episodes });
  } catch (error) {
    console.error("Error fetching episodes", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.get("/episodes/:id", (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error fetching episode", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.get("/conditions", (_, res) => {
  try {
    const conditions = db.data.conditions;

    res.send({
      status: "success",
      lengtt: conditions.length,
      data: conditions,
    });
  } catch (error) {
    console.error("Error fetching conditions", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.get("/conditions/:id", (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error fetching condition", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
