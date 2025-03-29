import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { dataStore } from "../index.ts";
import { EpisodeService } from "../services/episode-service.ts";

export function getEpisodes(ctx: RouterContext<string>) {
  try {
    const episodeService = new EpisodeService(dataStore);
    const episodes = episodeService.getAll();

    ctx.response.body = {
      status: "success",
      length: episodes.length,
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

    const episodeService = new EpisodeService(dataStore);
    const episode = episodeService.getById(id);
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

export function getEpisodesForPatient(ctx: RouterContext<string>) {
  try {
    const { id } = ctx.params;

    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "patient id is required",
      };
      return;
    }

    const episodeService = new EpisodeService(dataStore);
    const episodes = episodeService.getByPatientId(id);

    ctx.response.body = {
      status: "success",
      length: episodes.length,
      data: episodes,
    };
  } catch (error) {
    console.error("Error fetching patient", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}
