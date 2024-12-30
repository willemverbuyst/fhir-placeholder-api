import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { getEpisodesForPatientFromDataStore } from "../services/episode-services.ts";
import {
  getPatientFromDataStore,
  getPatientsFromDataStore,
} from "../services/patient-services.ts";

export function getAllPatients(ctx: RouterContext<string>) {
  try {
    const patients = getPatientsFromDataStore();

    ctx.response.body = {
      status: "success",
      length: patients.length,
      data: patients,
    };
  } catch (error) {
    console.error("Error fetching patients", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}

export function getPatient(ctx: RouterContext<string>) {
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

    const patient = getPatientFromDataStore(id);

    if (!patient) {
      ctx.response.status = 404;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "patient not found",
      };
    } else {
      ctx.response.body = { status: "success", data: patient };
    }
  } catch (error) {
    console.error("Error fetching patient", error);
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
