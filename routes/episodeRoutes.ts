import { Router } from "npm:express";
import { getEpisode, getEpisodes } from "../controllers/episodeController.ts";

const router = Router();

router.get("/", getEpisodes).get("/:id", getEpisode);

export default router;
