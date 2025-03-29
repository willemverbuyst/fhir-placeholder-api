import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { dataStore } from "../index.ts";
import { ConditionService } from "../services/condition-service.ts";
import { EpisodeService } from "../services/episode-service.ts";
import { OrganizationService } from "../services/organization-service.ts";
import { PatientService } from "../services/patient-service.ts";
import { PractitionerService } from "../services/practitioner-service.ts";

export function getAllPatients(ctx: RouterContext<string>) {
  try {
    const conditionService = new ConditionService(dataStore);
    const episodeService = new EpisodeService(dataStore);
    const organizationService = new OrganizationService(dataStore);
    const practitionerService = new PractitionerService(dataStore);
    const patientService = new PatientService(
      dataStore,
      conditionService,
      episodeService,
      organizationService,
      practitionerService
    );
    const patients = patientService.getAll();

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

    const conditionService = new ConditionService(dataStore);
    const episodeService = new EpisodeService(dataStore);
    const organizationService = new OrganizationService(dataStore);
    const practitionerService = new PractitionerService(dataStore);
    const patientService = new PatientService(
      dataStore,
      conditionService,
      episodeService,
      organizationService,
      practitionerService
    );
    const patient = patientService.getById(id);

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
