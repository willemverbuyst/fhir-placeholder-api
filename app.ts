// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { initializeDB } from "./db/index.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { morganMiddleware } from "./middlewares/morganMiddleWare.ts";
import conditionRoutes from "./routes/conditionRoutes.ts";
import episodeRoutes from "./routes/episodeRoutes.ts";
import patientRoutes from "./routes/patientRoutes.ts";

const app = express();

app.use(morganMiddleware);
app.use(errorHandler);

await initializeDB();

app.use("/conditions", conditionRoutes);
app.use("/episodes", episodeRoutes);
app.use("/patients", patientRoutes);

app.get("/", (_, res) => {
  res.send("Fhir Placeholder Api");
});

export default app;
