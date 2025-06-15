import { describe, expect, it, vi } from "vitest";
import { ZodIssueCode, ZodParsedType, z } from "zod";
import * as domExports from "./dom";
import * as parseExports from "./parse";
import * as resourceExports from "./resource";
import { validator } from "./validator";

describe("validator", () => {
  it("should log a warning when there is not input to validate", () => {
    const parseJSONInputMock = vi
      .spyOn(parseExports, "parseJSONInput")
      .mockReturnValue(null);
    const consoleWarnSpy = vi.spyOn(console, "warn");
    const buttonElement = document.createElement("button");

    validator(buttonElement);
    buttonElement.click();

    expect(parseJSONInputMock).toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith("No input to validate");

    consoleWarnSpy.mockRestore();
  });

  it("should call the necessary functions and log the success message when a valid input is provided", () => {
    const parseJSONInputMock = vi
      .spyOn(parseExports, "parseJSONInput")
      .mockReturnValue({ foo: "bar" });
    const findResourceTypeMock = vi
      .spyOn(resourceExports, "findResourceType")
      .mockReturnValue("Encounter");
    const parseWithZodMock = vi
      .spyOn(parseExports, "parseWithZod")
      .mockImplementation(() => null);
    const cleanUpDisplayMock = vi.spyOn(domExports, "cleanUpDisplay");
    const displaySuccessMock = vi.spyOn(domExports, "createSuccessMessage");
    const consoleInfoSpy = vi.spyOn(console, "info");
    const buttonElement = document.createElement("button");

    validator(buttonElement);
    buttonElement.click();

    expect(parseJSONInputMock).toHaveBeenCalled();
    expect(findResourceTypeMock).toHaveBeenCalled();
    expect(parseWithZodMock).toHaveBeenCalled();
    expect(cleanUpDisplayMock).toHaveBeenCalled();
    expect(displaySuccessMock).toHaveBeenCalled();
    expect(consoleInfoSpy).toHaveBeenCalledWith("✅ Parsed input with zod");

    consoleInfoSpy.mockRestore();
  });

  it("should call the necessary functions, log error, and clean up display when an error occurs", () => {
    const parseJSONInputMock = vi
      .spyOn(parseExports, "parseJSONInput")
      .mockReturnValue({ foo: "bar" });
    const findResourceTypeMock = vi
      .spyOn(resourceExports, "findResourceType")
      .mockReturnValue("Encounter");
    const parseWithZodMock = vi
      .spyOn(parseExports, "parseWithZod")
      .mockImplementation(() => {
        throw new Error("Something went wrong");
      });
    const cleanUpDisplayMock = vi.spyOn(domExports, "cleanUpDisplay");
    const displaySuccessMock = vi.spyOn(domExports, "createSuccessMessage");
    const createGenericErrorMessageMock = vi.spyOn(
      domExports,
      "createGenericErrorMessage",
    );
    const consoleErrorSpy = vi.spyOn(console, "error");

    const buttonElement = document.createElement("button");

    validator(buttonElement);
    buttonElement.click();

    expect(parseJSONInputMock).toHaveBeenCalled();
    expect(findResourceTypeMock).toHaveBeenCalled();
    expect(parseWithZodMock).toHaveBeenCalled();
    expect(displaySuccessMock).not.toHaveBeenCalled();
    expect(cleanUpDisplayMock).toHaveBeenCalled();
    expect(createGenericErrorMessageMock).toHaveBeenCalledWith(
      "Something went wrong",
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should call the necessary functions, log zod error, and clean up display when an error occurs", () => {
    const parseJSONInputMock = vi
      .spyOn(parseExports, "parseJSONInput")
      .mockReturnValue({ foo: "bar" });
    const findResourceTypeMock = vi
      .spyOn(resourceExports, "findResourceType")
      .mockReturnValue("Encounter");
    const parseWithZodMock = vi
      .spyOn(parseExports, "parseWithZod")
      .mockImplementation(() => {
        throw new z.ZodError([
          {
            expected: "'active' | 'inactive' | 'entered-in-error'",
            received: ZodParsedType.undefined,
            code: ZodIssueCode.invalid_literal,
            path: ["status"],
            message: "Required",
          },
        ]);
      });
    const cleanUpDisplayMock = vi.spyOn(domExports, "cleanUpDisplay");
    const displaySuccessMock = vi.spyOn(domExports, "createSuccessMessage");
    const createErrorMessageMock = vi.spyOn(domExports, "createErrorMessage");
    const consoleErrorSpy = vi.spyOn(console, "error");

    const buttonElement = document.createElement("button");

    validator(buttonElement);
    buttonElement.click();

    expect(parseJSONInputMock).toHaveBeenCalled();
    expect(findResourceTypeMock).toHaveBeenCalled();
    expect(parseWithZodMock).toHaveBeenCalled();
    expect(displaySuccessMock).not.toHaveBeenCalled();
    expect(cleanUpDisplayMock).toHaveBeenCalled();
    expect(createErrorMessageMock).toBeCalledTimes(1);
    expect(createErrorMessageMock).toHaveBeenCalledWith(
      {
        expected: "'active' | 'inactive' | 'entered-in-error'",
        received: ZodParsedType.undefined,
        code: ZodIssueCode.invalid_literal,
        path: ["status"],
        message: "Required",
      },
      0,
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should call the necessary functions, log generic error, and clean up display when an error occurs", () => {
    const parseJSONInputMock = vi
      .spyOn(parseExports, "parseJSONInput")
      .mockReturnValue({ foo: "bar" });
    const findResourceTypeMock = vi
      .spyOn(resourceExports, "findResourceType")
      .mockImplementation(() => {
        throw "Something went wrong";
      });
    const createGenericErrorMessageMock = vi.spyOn(
      domExports,
      "createGenericErrorMessage",
    );
    const consoleErrorSpy = vi.spyOn(console, "error");

    const buttonElement = document.createElement("button");

    validator(buttonElement);
    buttonElement.click();

    expect(parseJSONInputMock).toHaveBeenCalled();
    expect(findResourceTypeMock).toHaveBeenCalled();
    expect(createGenericErrorMessageMock).not.toHaveBeenCalledWith(
      "Something went wrong",
    );
    expect(createGenericErrorMessageMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
