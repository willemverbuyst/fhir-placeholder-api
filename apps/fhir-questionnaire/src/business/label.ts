import { QuestionnaireItem } from "fhir/r4";

export const getLabel = (item: QuestionnaireItem) => {
  const prefix = item?.prefix;
  const text =
    item?.text || item?.code?.[0].display || item?.code?.[0].code || "";
  return [prefix, text].join(" ").trim();
};
