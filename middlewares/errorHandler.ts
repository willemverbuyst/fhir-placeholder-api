import { NextFunction, Request, Response } from "npm:express";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  const message = err instanceof Error ? err.message : JSON.stringify(err);

  res.status(500).json({ status: "error", message });
};
