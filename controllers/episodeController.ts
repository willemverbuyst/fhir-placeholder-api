import { Request, Response } from "npm:express";
import {
  getEpisodeFromDB,
  getEpisodesFromDB,
} from "../services/episodeService.ts";

export function getEpisodes(_: Request, res: Response) {
  try {
    const episodes = getEpisodesFromDB();

    res.send({ status: "success", lengtt: episodes.length, data: episodes });
  } catch (error) {
    console.error("Error fetching episodes", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}

export function getEpisode(req: Request, res: Response) {
  try {
    const episode = getEpisodeFromDB(req.params.id);
    if (!episode) {
      res.status(404).send({
        status: "fail",
        data: null,
        message: "episode of care not found",
      });
    } else {
      res.send({ status: "success", data: episode });
    }
  } catch (error) {
    console.error("Error fetching episode", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}
