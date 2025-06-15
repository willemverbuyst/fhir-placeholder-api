export const itemType = {
  Group: "group",
  Display: "display",
  Question: "question",
  Boolean: "boolean",
  Decimal: "decimal",
  Integer: "integer",
  Date: "date",
  DateTime: "dateTime",
  Time: "time",
  String: "string",
  Text: "text",
  Url: "url",
  Choice: "choice",
  OpenChoice: "open-choice",
  Attachment: "attachment",
  Reference: "reference",
  Quantity: "quantity",
} as const;

export const enableBehavior = {
  All: "all",
  Any: "any",
} as const;

export const questionnaireStatus = {
  Draft: "draft",
  Active: "active",
  Retired: "retired",
  Unknown: "unknown",
} as const;
