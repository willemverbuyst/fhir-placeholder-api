import { RouterContext } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import {
  getConditionFromDataStore,
  getConditionsFromDataStore,
} from "../services/condition-services.ts";

export function getConditions(ctx: RouterContext<string>) {
  try {
    const conditions = getConditionsFromDataStore();

    ctx.response.body = {
      status: "success",
      length: conditions.length,
      data: conditions,
    };
  } catch (error) {
    console.error("Error fetching conditions", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}

export function getCondition(ctx: RouterContext<string>) {
  try {
    const { id } = ctx.params;

    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "condition id is required",
      };
      return;
    }

    const condition = getConditionFromDataStore(id);

    if (!condition) {
      ctx.response.status = 404;
      ctx.response.body = {
        status: "fail",
        data: null,
        message: "condition not found",
      };
    } else {
      ctx.response.body = { status: "success", data: condition };
    }
  } catch (error) {
    console.error("Error fetching condition", error);
    ctx.response.status = 500;
    ctx.response.body = { status: "error", message: "internal server error" };
  }
}
