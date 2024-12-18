import { Request, Response } from "npm:express";
import { db } from "../main.ts";

export function getEpisodes(_: Request, res: Response) {
  try {
    const episodes = db.data.episodes;

    res.send({ status: "success", lengtt: episodes.length, data: episodes });
  } catch (error) {
    console.error("Error fetching episodes", error);
    res.status(500).send({ status: "error", message: "internal server error" });
  }
}

export function getEpisode(req: Request, res: Response) {
  try {
    const episode = db.data.episodes.find((e) => e.id === req.params.id);
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
