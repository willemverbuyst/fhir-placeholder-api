import { z } from "zod";
import {
  cleanUpDisplay,
  createErrorMessage,
  createGenericErrorMessage,
  createSuccessMessage,
} from "./dom";
import { parseJSONInput, parseWithZod } from "./parse";
import { findResourceType } from "./resource";

export function validator(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    const value = parseJSONInput();

    if (!value) {
      console.warn("No input to validate");
      return;
    }

    try {
      const resourceType = findResourceType(value);

      parseWithZod(value, resourceType);
      cleanUpDisplay();
      createSuccessMessage();
      console.info("✅ Parsed input with zod");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        cleanUpDisplay();
        error.issues.forEach((i, index) => createErrorMessage(i, index));
        console.error(error);
        return;
      }

      if (error instanceof Error) {
        cleanUpDisplay();
        createGenericErrorMessage(error.message);
        console.error(error.message);
        return;
      }

      cleanUpDisplay();
      createGenericErrorMessage();
      console.error(error);
    }
  });
}
