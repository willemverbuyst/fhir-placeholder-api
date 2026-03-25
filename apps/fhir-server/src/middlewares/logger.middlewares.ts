import { Inject, Injectable, type NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { Logger } from "winston";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
  ) {}

  use(req: Request, _res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== "test") {
      this.logger.info(
        `${req.method} ${req.originalUrl} ${Object.keys(req.body ?? {}).length ? { body: req.body } : ""}`,
      );
    }

    if (next) {
      next();
    }
  }
}
