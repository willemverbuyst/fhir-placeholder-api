import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getEpisodeFromDB,
  getEpisodesFromDB,
} from "../services/episodeService.ts";

export function getEpisodes(ctx: RouterContext<string>) {
  try {
    const episodes = getEpisodesFromDB();

    ctx.response.body = {
      status: "success",
      lengtt: episodes.length,
      data: episodes,
    };
  } catch (error) {
    console.error("Error fetching episodes", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}

export function getEpisode(ctx: RouterContext<string>) {
  try {
    const { id } = ctx.params;

    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "episode id is required",
      };
      return;
    }

    const episode = getEpisodeFromDB(id);
    if (!episode) {
      ctx.response.status = 404;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "episode not found",
      };
    } else {
      ctx.response.body = { status: "success", data: episode };
    }
  } catch (error) {
    console.error("Error fetching episode", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}
