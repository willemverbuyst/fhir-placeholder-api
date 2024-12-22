import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getEpisodeFromDataStore,
  getEpisodesForPatientFromDataStore,
  getEpisodesFromDataStore,
} from "../services/episode-services.ts";

export function getEpisodes(ctx: RouterContext<string>) {
  const { searchParams } = ctx.request.url;
  const patientId = searchParams.get("patient");

  if (patientId) {
    try {
      const episodes = getEpisodesForPatientFromDataStore(patientId);

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
  } else {
    try {
      const episodes = getEpisodesFromDataStore();

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

    const episode = getEpisodeFromDataStore(id);
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

    const episodes = getEpisodesForPatientFromDataStore(id);

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
