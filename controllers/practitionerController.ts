import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getPractitionerFromDataStore,
  getPractitionersFromDataStore,
} from "../services/practitionerService.ts";

export function getPractitioners(ctx: RouterContext<string>) {
  try {
    const practitioners = getPractitionersFromDataStore();

    ctx.response.body = {
      status: "success",
      length: practitioners.length,
      data: practitioners,
    };
  } catch (error) {
    console.error("Error fetching practitioners", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}

export function getPractitioner(ctx: RouterContext<string>) {
  try {
    const { id } = ctx.params;

    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "practitioner id is required",
      };
      return;
    }

    const practitioner = getPractitionerFromDataStore(id);

    if (!practitioner) {
      ctx.response.status = 404;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "practitioner not found",
      };
    } else {
      ctx.response.body = { status: "success", data: practitioner };
    }
  } catch (error) {
    console.error("Error fetching practitioner", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}
