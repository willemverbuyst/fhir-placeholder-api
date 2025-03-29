import { Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getEpisode,
  getEpisodes,
  getEpisodesForPatient,
} from "../controllers/episode-controller.ts";

const router = new Router();

router
  .get("/", getEpisodes)
  .get("/:id", getEpisode)
  .get("/patient/:id", getEpisodesForPatient);

export default router;
