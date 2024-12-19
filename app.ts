import { Application } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { seedDataStore } from "./data/index.ts";
import { logger } from "./middlewares/logger.ts";
import conditionRoutes from "./routes/conditionRoutes.ts";
import episodeRoutes from "./routes/episodeRoutes.ts";
import patientRoutes from "./routes/patientRoutes.ts";

const app = new Application();

seedDataStore();

// Middleware
app.use(logger);

app.use(conditionRoutes.prefix("/conditions").routes());
app.use(conditionRoutes.allowedMethods());

app.use(episodeRoutes.prefix("/episodes").routes());
app.use(episodeRoutes.allowedMethods());

app.use(patientRoutes.prefix("/patients").routes());
app.use(patientRoutes.allowedMethods());

export default app;
