import { Router } from "npm:express";
import {
  getAllPatients,
  getEpisodesForPatient,
  getPatient,
} from "../controllers/patientController.ts";

const router = Router();

router
  .get("/", getAllPatients)
  .get("/:id", getPatient)
  .get("/:id/episodes", getEpisodesForPatient);

export default router;
