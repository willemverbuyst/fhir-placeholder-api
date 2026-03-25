import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Logger } from "winston";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject("winston")
    private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl } = req;
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse();
          const { statusCode } = res;

          this.logger.log("info", {
            message: "HTTP Request",
            method,
            url: originalUrl,
            statusCode,
            duration: `${Date.now() - start}ms`,
          });
        },
        error: (err) => {
          this.logger.log("error", {
            message: "HTTP Error",
            method,
            url: originalUrl,
            statusCode: err.status,
            duration: `${Date.now() - start}ms`,
            error: err.message,
          });
        },
      }),
    );
  }
}
