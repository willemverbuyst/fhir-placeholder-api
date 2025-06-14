import { Injectable, type NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== "test") {
      console.log(
        "%s %s",
        req.method,
        req.originalUrl,
        Object.keys(req.body ?? {}).length ? { body: req.body } : "",
      );
    }

    if (next) {
      next();
    }
  }
}
