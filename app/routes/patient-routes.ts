import { Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getAllPatients,
  getEpisodesForPatient,
  getPatient,
} from "../controllers/patient-controllers.ts";

const router = new Router();

router
  .get("/", getAllPatients)
  .get("/:id/episodes", getEpisodesForPatient)
  .get("/:id", getPatient);

export default router;
