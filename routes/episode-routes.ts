import { Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { getEpisode, getEpisodes } from "../controllers/episode-controllers.ts";

const router = new Router();

router.get("/", getEpisodes).get("/:id", getEpisode);

export default router;
