import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Encounter } from "../fhirR4/Resources/Encounter";
import { Flag } from "../fhirR4/Resources/Flag";
import { Resources } from "../fhirR4/resources";
import * as exports from "./dom";
import { parseJSONInput, parseWithZod } from "./parse";

describe("parseJSONInput", () => {
  beforeEach(() => {
    const textareaElement = document.createElement("textarea");
    textareaElement.id = "resourceInput";
    // extra white space in string, to test trim
    textareaElement.value = '{ "name": "John", "age": 30 } ';

    document.body.appendChild(textareaElement);
  });

  afterEach(() => {
    const textareaElement = document.getElementById("resourceInput");

    if (textareaElement) {
      textareaElement.remove();
    }
  });
  it("should return the parsed JSON value when valid JSON is provided", () => {
    const result = parseJSONInput();

    expect(result).toEqual({ name: "John", age: 30 });
  });

  it("should log an error and display a generic error message when invalid JSON is provided", () => {
    const textareaElement = document.getElementById(
      "resourceInput",
    ) as HTMLTextAreaElement;
    textareaElement.value = "just a random string";

    const createGenericErrorMessageyMock = vi.spyOn(
      exports,
      "createGenericErrorMessage",
    );

    parseJSONInput();

    expect(createGenericErrorMessageyMock).toHaveBeenCalledWith(
      "Not valid JSON",
    );
  });

  it("should return null and log a warning when no input element is found", () => {
    const textareaElement = document.getElementById(
      "resourceInput",
    ) as HTMLTextAreaElement;
    textareaElement.remove();

    const consoleWarnSpy = vi.spyOn(console, "warn");

    const result = parseJSONInput();

    expect(result).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith("No input element found");

    consoleWarnSpy.mockRestore();
  });
});

describe("parseWithZod", () => {
  it.each([
    { resource: Resources.Encounter, zodObject: Encounter },
    { resource: Resources.Flag, zodObject: Flag },
  ])(
    "should call the correct Zod parse function $zodObject when a valid value and resource type $resource are provided",
    ({ resource, zodObject }) => {
      const value = { foo: "bar" };
      const resourceType = resource;
      const parseSpy = vi.fn();

      vi.spyOn(zodObject, "parse").mockImplementation(parseSpy);

      parseWithZod(value, resourceType);

      expect(parseSpy).toHaveBeenCalledWith(value);
    },
  );
});
