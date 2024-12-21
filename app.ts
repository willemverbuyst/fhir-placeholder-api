import { Application } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { seedDataStore } from "./data/index.ts";
import { logger } from "./middlewares/logger.ts";
import conditionRoutesR5 from "./routes/R5/conditionRoutes.ts";
import episodeRoutesR5 from "./routes/R5/episodeRoutes.ts";
import patientRoutesR5 from "./routes/R5/patientRoutes.ts";
import practitionerRoutesR5 from "./routes/R5/practitionerRoutes.ts";

const VERSION_5 = "R5";

const app = new Application();

seedDataStore();

// Middleware
app.use(logger);

app.use(conditionRoutesR5.prefix(`/${VERSION_5}/conditions`).routes());
app.use(conditionRoutesR5.allowedMethods());

app.use(episodeRoutesR5.prefix(`/${VERSION_5}/episodes`).routes());
app.use(episodeRoutesR5.allowedMethods());

app.use(patientRoutesR5.prefix(`/${VERSION_5}/patients`).routes());
app.use(patientRoutesR5.allowedMethods());

app.use(practitionerRoutesR5.prefix(`/${VERSION_5}/practitioners`).routes());
app.use(practitionerRoutesR5.allowedMethods());

app.use((context) => {
  context.response.status = 404;
  context.response.body = {
    status: "error",
    message: "Route not found",
  };
});

export default app;
