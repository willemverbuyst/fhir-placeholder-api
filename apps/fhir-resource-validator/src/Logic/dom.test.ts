import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ZodIssueCode, ZodParsedType } from "zod";
import {
  cleanUpDisplay,
  createCard,
  createErrorMessage,
  createGenericErrorMessage,
  createParagraph,
  displayMessage,
} from "./dom";

describe("createCard", () => {
  it("should create an error card with the given text", () => {
    const text = "Foobar!";
    const errorCard = createCard("ERROR", text);

    expect(errorCard).toBeInstanceOf(HTMLDivElement);
    expect(errorCard.classList.contains("error-card")).toBe(true);

    const title = errorCard.querySelector("h4");
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe(text);
  });

  it("should create an warning card with the given text", () => {
    const text = "Foobar!";
    const errorCard = createCard("WARNING", text);

    expect(errorCard).toBeInstanceOf(HTMLDivElement);
    expect(errorCard.classList.contains("warning-card")).toBe(true);

    const title = errorCard.querySelector("h4");
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe(text);
  });

  it("should create an error card with the given text", () => {
    const text = "Foobar!";
    const errorCard = createCard("SUCCESS", text);

    expect(errorCard).toBeInstanceOf(HTMLDivElement);
    expect(errorCard.classList.contains("success-card")).toBe(true);

    const title = errorCard.querySelector("h4");
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe(text);
  });

  it("should create an error card with no text when no text is provided", () => {
    const errorCard = createCard("ERROR");

    expect(errorCard).toBeInstanceOf(HTMLDivElement);
    expect(errorCard.classList.contains("error-card")).toBe(true);

    const title = errorCard.querySelector("h4");
    expect(title).toBeNull();
  });
});

describe("createParagraph", () => {
  it("should create a paragraph element with the given text", () => {
    const text = "foobar";
    const paragraph = createParagraph(text);

    expect(paragraph).toBeInstanceOf(HTMLParagraphElement);
    expect(paragraph.textContent).toBe(text);
  });
});

describe("cleanUpDisplay", () => {
  beforeEach(() => {
    const messageElement = document.createElement("div");
    messageElement.id = "message";

    const child1 = document.createElement("p");
    const child2 = document.createElement("p");
    messageElement.appendChild(child1);
    messageElement.appendChild(child2);

    document.body.appendChild(messageElement);
  });

  afterEach(() => {
    const messageElement = document.getElementById("message");

    if (messageElement) {
      messageElement.remove();
    }
  });

  it("should remove all child elements from the success message element", () => {
    cleanUpDisplay();

    const messageElement = document.getElementById("message") as HTMLDivElement;

    expect(messageElement.childElementCount).toBe(0);
  });

  it("should handle the case when no success message element is found", () => {
    const messageElement = document.getElementById("message") as HTMLDivElement;

    messageElement.remove();

    const consoleWarnSpy = vi.spyOn(global.console, "warn");

    cleanUpDisplay();

    expect(consoleWarnSpy).toHaveBeenCalledWith("No message element found");

    consoleWarnSpy.mockRestore();
  });
});

describe("displayMessage", () => {
  beforeEach(() => {
    const message = document.createElement("div");
    message.id = "message";

    document.body.appendChild(message);
  });

  afterEach(() => {
    const message = document.getElementById("message");

    if (message) {
      message.remove();
    }
  });

  it("should append the card and paragraph to the error message element", () => {
    const card = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Foobar!";

    displayMessage(card, paragraph);

    const message = document.getElementById("message");
    expect(message).toBeInstanceOf(HTMLDivElement);
    expect(message?.childElementCount).toBe(1);

    const appendedCard = message?.querySelector("div");
    expect(appendedCard).toBe(card);

    const appendedParagraph = card.querySelector("p");
    expect(appendedParagraph).toBe(paragraph);
    expect(appendedParagraph?.textContent).toBe("Foobar!");
  });

  it("should append the card when there is no paragraph to the error message element", () => {
    const card = document.createElement("div");

    displayMessage(card);

    const message = document.getElementById("message");
    expect(message).toBeInstanceOf(HTMLDivElement);
    expect(message?.childElementCount).toBe(1);

    const appendedCard = message?.querySelector("div");
    expect(appendedCard).toBe(card);
  });

  it("should not throw any errors when no message element is found", () => {
    const card = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Foobar!";

    expect(() => displayMessage(card, paragraph)).not.toThrow();
  });

  it("should handle the case when no message element is found", () => {
    const messageElement = document.getElementById("message") as HTMLDivElement;

    messageElement.remove();

    const card = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Foobar!";

    const consoleWarnSpy = vi.spyOn(global.console, "warn");

    displayMessage(card, paragraph);

    expect(consoleWarnSpy).toHaveBeenCalledWith("No message element found");

    consoleWarnSpy.mockRestore();
  });
});

describe("createErrorMessage", () => {
  beforeEach(() => {
    const messageElement = document.createElement("div");
    messageElement.id = "message";

    document.body.appendChild(messageElement);
  });

  afterEach(() => {
    const messageElement = document.getElementById("message");

    if (messageElement) {
      messageElement.remove();
    }
  });

  it("should create an error message with the correct error card and paragraph", () => {
    const issue = {
      expected: "'active' | 'inactive' | 'entered-in-error'",
      received: ZodParsedType.undefined,
      code: ZodIssueCode.invalid_literal,
      path: ["status"],
      message: "Required",
    };
    const index = 0;

    createErrorMessage(issue, index);

    const errorMessage = document.getElementById("message");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe("status: Required");

    const h4Element = document.querySelectorAll(".error-card h4")[0].innerHTML;
    expect(h4Element).toBe("ERROR #1");
  });

  it("should create an warning message with the correct error card and paragraph", () => {
    const issue = {
      expected: "'active' | 'inactive' | 'entered-in-error'",
      received: ZodParsedType.undefined,
      code: ZodIssueCode.invalid_literal,
      path: ["status"],
      message: "Required",
      keys: ["_birthDate"],
    };
    const index = 0;

    createErrorMessage(issue, index);

    const errorMessage = document.getElementById("message");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".warning-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe("status: Required");

    const h4Element =
      document.querySelectorAll(".warning-card h4")[0].innerHTML;
    expect(h4Element).toBe("WARNING #1");
  });

  it("should create an error message with the correct error card and paragraph even if path is missing in issue", () => {
    const issue = {
      expected: "'active' | 'inactive' | 'entered-in-error'",
      received: ZodParsedType.undefined,
      code: ZodIssueCode.invalid_literal,
      path: [],
      message: "Error message",
    };
    const index = 0;

    createErrorMessage(issue, index);

    const errorMessage = document.getElementById("message");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe("Error message");
  });
});

describe("createGenericErrorMessage", () => {
  beforeEach(() => {
    const messageElement = document.createElement("div");
    messageElement.id = "message";

    document.body.appendChild(messageElement);
  });

  afterEach(() => {
    const messageElement = document.getElementById("message");

    if (messageElement) {
      messageElement.remove();
    }
  });

  it("should create an error message with the correct card and paragraph", () => {
    const text = "Error, foobar";

    createGenericErrorMessage(text);

    const errorMessage = document.getElementById("message");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const h4Element = document.querySelectorAll(".error-card h4")[0].innerHTML;
    expect(h4Element).toBe(text);
  });

  it("should create an error message with default text when no text is provided", () => {
    const defaultText = "Something went wrong";

    createGenericErrorMessage();

    const errorMessage = document.getElementById("message");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const h4Element = document.querySelectorAll(".error-card h4")[0].innerHTML;
    expect(h4Element).toBe(defaultText);
  });
});
