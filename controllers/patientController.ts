import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getEpisodesForPatientFromDB,
  getPatientFromDB,
  getPatientsFromDB,
} from "../services/patientService.ts";

export function getAllPatients(ctx: RouterContext<string>) {
  try {
    const patients = getPatientsFromDB();

    ctx.response.body = {
      status: "success",
      lengtt: patients.length,
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

    const patient = getPatientFromDB(id);

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

    const episodes = getEpisodesForPatientFromDB(id);

    ctx.response.body = {
      status: "success",
      lengtt: episodes.length,
      data: episodes,
    };
  } catch (error) {
    console.error("Error fetching patient", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}
