import { Middleware } from "https://deno.land/x/oak@v17.1.3/mod.ts";

export const logger: Middleware = async (context, next) => {
  console.log(`${context.request.method} ${context.request.url}`);
  await next();
};
