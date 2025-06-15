import { z } from "zod";

export function createCard(
  type: "ERROR" | "SUCCESS" | "WARNING",
  text?: string,
) {
  const card = document.createElement("div");
  card.className =
    type === "ERROR"
      ? "error-card"
      : type === "WARNING"
        ? "warning-card"
        : "success-card";

  const title = document.createElement("h4");

  if (text) {
    const titleTextNode = document.createTextNode(text);
    title.appendChild(titleTextNode);
    card.appendChild(title);
  }

  return card;
}

export function createParagraph(text: string) {
  const paragraph = document.createElement("p");
  const paragraphTextNode = document.createTextNode(text);
  paragraph.appendChild(paragraphTextNode);

  return paragraph;
}

export function cleanUpDisplay() {
  const message = document.getElementById("message");

  if (!(message && message instanceof HTMLDivElement)) {
    console.warn("No message element found");
    return;
  }

  let child = message.lastElementChild;
  while (child) {
    message.removeChild(child);
    child = message.lastElementChild;
  }
}

export function displayMessage(
  card: HTMLDivElement,
  paragraph?: HTMLParagraphElement,
) {
  const message = document.getElementById("message");

  if (!(message && message instanceof HTMLDivElement)) {
    console.warn("No message element found");
    return;
  }

  if (paragraph) {
    card.appendChild(paragraph);
  }

  message.appendChild(card);
}

export function createErrorMessage(issue: z.ZodIssue, index: number) {
  const messageType =
    "keys" in issue && String(issue.keys).startsWith("_") ? "WARNING" : "ERROR";
  const card = createCard(messageType, `${messageType} #${index + 1}`);
  const message = issue.path.length
    ? `${issue.path}: ${issue.message}`
    : issue.message;
  const paragraph = createParagraph(message);

  displayMessage(card, paragraph);
}

export function createGenericErrorMessage(text = "Something went wrong") {
  const card = createCard("ERROR", text);

  displayMessage(card);
}

export function createSuccessMessage() {
  const card = createCard("SUCCESS", "Looking good!");

  displayMessage(card);
}

export function buildList() {
  const divForList = document.getElementById("list");

  const list = document.createElement("ul");

  const validatableResources = [
    "Consent",
    "Flag",
    "Group",
    "Location",
    "Organization",
    "Patient",
    "Person",
    "Practitioner",
    "PractitionerRole",
    "RelatedPerson",
  ];

  for (const resource of validatableResources) {
    const listItem = document.createElement("li");
    const listItemText = document.createTextNode(String(resource));
    listItem.appendChild(listItemText);
    list.appendChild(listItem);
  }

  divForList?.appendChild(list);
}
