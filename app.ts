// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { Low, Memory } from "npm:lowdb";
import morganMiddleware from "./config/morganMiddleWare.ts";
import { Data } from "./models/data.ts";
import conditionRoutes from "./routes/conditionRoutes.ts";
import episodeRoutes from "./routes/episodeRoutes.ts";
import patientRoutes from "./routes/patientRoutes.ts";
import { seedDB } from "./seed.ts";

// Setup adapter and database
const adapter = new Memory<Data>();
const defaultData: Data = { patients: [], episodes: [], conditions: [] };
export const db = new Low<Data>(adapter, defaultData);

// Initialize database
await db.read();
seedDB(db);

const app = express();

app.use(morganMiddleware);
app.use("/conditions", conditionRoutes);
app.use("/episodes", episodeRoutes);
app.use("/patients", patientRoutes);

app.get("/", (_, res) => {
  res.send("Fhir Placeholder Api");
});

export default app;
