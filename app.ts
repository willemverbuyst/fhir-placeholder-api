import { Application } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { seedDataStore } from "./data/index.ts";
import { logger } from "./middlewares/logger.ts";
import conditionRoutes from "./routes/condition-routes.ts";
import episodeRoutes from "./routes/episode-routes.ts";
import organizationRoutes from "./routes/organization-routes.ts";
import patientRoutes from "./routes/patient-routes.ts";
import practitionerRoutes from "./routes/practitioner-routes.ts";

const FHIR_VERSION_R5 = "R5";

const app = new Application();

seedDataStore();

// Middleware
app.use(logger);

app.use(conditionRoutes.prefix(`/${FHIR_VERSION_R5}/conditions`).routes());
app.use(conditionRoutes.allowedMethods());

app.use(episodeRoutes.prefix(`/${FHIR_VERSION_R5}/episodes`).routes());
app.use(episodeRoutes.allowedMethods());

app.use(patientRoutes.prefix(`/${FHIR_VERSION_R5}/patients`).routes());
app.use(patientRoutes.allowedMethods());

app.use(
  practitionerRoutes.prefix(`/${FHIR_VERSION_R5}/practitioners`).routes()
);
app.use(practitionerRoutes.allowedMethods());

app.use(
  organizationRoutes.prefix(`/${FHIR_VERSION_R5}/organizations`).routes()
);
app.use(organizationRoutes.allowedMethods());

app.use((context) => {
  context.response.status = 404;
  context.response.body = {
    status: "error",
    message: "Route not found",
  };
});

export default app;
