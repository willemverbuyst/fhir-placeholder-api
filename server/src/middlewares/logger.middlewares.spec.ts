import { Request, Response } from "express";
import { LoggerMiddleware } from "./logger.middlewares";

describe("LoggerMiddleware", () => {
  let loggerMiddleware: LoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: jest.Mock;

  beforeEach(() => {
    loggerMiddleware = new LoggerMiddleware();
    mockRequest = {
      method: "GET",
      originalUrl: "/test",
      body: { key: "value" },
    };
    mockResponse = {};
    mockNextFunction = jest.fn();
  });

  it("should call next function", () => {
    loggerMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction,
    );

    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('should log request details when NODE_ENV is not "test"', () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    process.env.NODE_ENV = "development";

    loggerMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction,
    );

    expect(consoleLogSpy).toHaveBeenCalledWith("%s %s", "GET", "/test", {
      body: { key: "value" },
    });

    consoleLogSpy.mockRestore();
  });

  it('should not log request details when NODE_ENV is "test"', () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    process.env.NODE_ENV = "test";

    loggerMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction,
    );

    expect(consoleLogSpy).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });

  it("should handle empty request body gracefully", () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    process.env.NODE_ENV = "development";

    mockRequest.body = {};

    loggerMiddleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction,
    );

    expect(consoleLogSpy).toHaveBeenCalledWith("%s %s", "GET", "/test", "");

    consoleLogSpy.mockRestore();
  });
});
