import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { dataStore } from "../index.ts";
import { OrganizationService } from "../services/organization-service.ts";

export function getOrganizations(ctx: RouterContext<string>) {
  try {
    const organizationService = new OrganizationService(dataStore);
    const organizations = organizationService.getAll();

    ctx.response.body = {
      status: "success",
      length: organizations.length,
      data: organizations,
    };
  } catch (error) {
    console.error("Error fetching organizations", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}

export function getOrganization(ctx: RouterContext<string>) {
  try {
    const { id } = ctx.params;

    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "organization id is required",
      };
      return;
    }

    const organizationService = new OrganizationService(dataStore);
    const organization = organizationService.getById(id);

    if (!organization) {
      ctx.response.status = 404;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "organization not found",
      };
    } else {
      ctx.response.body = { status: "success", data: organization };
    }
  } catch (error) {
    console.error("Error fetching organization", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}
