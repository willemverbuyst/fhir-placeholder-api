import type { Bundle, Coding, Questionnaire, QuestionnaireItem } from "fhir/r4";
import {
  type ConvertedQuestionnaire,
  hasProp,
} from "../interfaces/questionnaire";
import type { Meta, Unit } from "../interfaces/unit";
import { getOptions } from "./choice";
import { getLabel } from "./label";

const flattenQuestionnaire = (
  item: QuestionnaireItem,
  container: (QuestionnaireItem & { groupLabel?: string })[],
  groupLabel = "",
): void => {
  let label = groupLabel;
  for (const prop of Object.keys(item)) {
    if (item.type === "group" && getLabel(item)) {
      label = getLabel(item);
    }
    if (hasProp(prop, item) && typeof item[prop] === "object") {
      // @ts-ignore
      flattenQuestionnaire(item[prop], container, groupLabel);
    } else if (prop === "linkId") {
      container.push({ ...item, groupLabel: label });
    }
  }
};

const convertQuestionnaire = (
  questionnaire: Questionnaire,
  bundle?: Bundle,
): { units: Unit[]; meta: Meta; questionnaire: Questionnaire } => {
  let originalItems = questionnaire.item || [];
  const item: QuestionnaireItem[] = [];
  const meta: Meta = { title: "", subTitle: "" };

  meta.title = createMetaInfo(questionnaire);

  if (
    questionnaire.item &&
    originalItems.length === 1 &&
    originalItems[0].type === "group"
  ) {
    meta.subTitle = getLabel(originalItems[0]);
    originalItems = questionnaire.item[0].item || [];
  }
  for (const i of originalItems) {
    flattenQuestionnaire(i, item);
  }

  const units = item
    .map((i) => createInputUnit(i, questionnaire, bundle))
    .map((i) => i.unit)
    .filter((i) => !(i.type === "group"));

  return { units, meta, questionnaire };
};

const createMetaInfo = (questionnaire: Questionnaire): string =>
  questionnaire.title
    ? questionnaire.title
    : questionnaire.code?.[0]?.display
      ? questionnaire.code[0].display
      : "";

const createInputUnit = (
  item: QuestionnaireItem & { groupLabel?: string },
  questionnaire: Questionnaire,
  bundle?: Bundle,
): { unit: Unit } => {
  if (!item.linkId) {
    throw new Error("linkId missing in one the items");
  }

  if (!item.type) {
    throw new Error("type missing in one the items");
  }
  // required properties
  const linkId = item.linkId;
  const type = item.type;

  // optional properties
  const label = getLabel(item);
  const readOnly = item.readOnly ?? false;
  const defaultValue = item.initial;
  const required = item.required ?? false;
  const groupLabel = item.groupLabel;

  let options: Coding[] = [];
  if (item.type === "choice") {
    options = getOptions(item, questionnaire, bundle);
  }

  const unit = {
    defaultValue,
    linkId,
    type,
    label,
    required,
    readOnly,
    options,
    groupLabel,
  };

  return { unit };
};

const handleBundle = (bundle: Bundle) => {
  const entries = bundle.entry || [];
  const resources = entries.map((entry) => entry.resource);
  const questionnaire = resources.find(
    (resource) => resource?.resourceType === "Questionnaire",
  );
  if (questionnaire?.resourceType === "Questionnaire") {
    return convertQuestionnaire(questionnaire, bundle);
  }
};

const handleResource = (
  resource: Questionnaire | Bundle,
): { units: Unit[]; meta: Meta; questionnaire: Questionnaire } | undefined => {
  if (resource.resourceType === "Questionnaire") {
    return convertQuestionnaire(resource);
  }
  if (resource.resourceType === "Bundle") {
    return handleBundle(resource);
  }
  console.warn("Resource could not be processed");
};

export const main = (
  resource: Questionnaire | Bundle,
): ConvertedQuestionnaire | undefined => {
  const convertedQuestionnaire = handleResource(resource);
  if (
    convertedQuestionnaire &&
    (resource.resourceType === "Bundle" ||
      resource.resourceType === "Questionnaire")
  ) {
    return convertedQuestionnaire;
  }
  return undefined;
};
