import { Bundle } from "../interfaces/bundle";
import { itemType } from "../interfaces/constants";
import { Coding } from "../interfaces/general";
import {
  ConvertedQuestionnaire,
  Item,
  Questionnaire,
  hasProp,
} from "../interfaces/questionnaire";
import { ResourceType } from "../interfaces/resourceType";
import { Meta, Unit } from "../interfaces/unit";
import { getOptions } from "./choice";
import { getLabel } from "./label";

const flattenQuestionnaire = (
  item: Item,
  container: Item[],
  groupLabel = "",
): void => {
  for (const prop of Object.keys(item)) {
    if (item.type === itemType.Group && getLabel(item)) {
      // biome-ignore lint/style/noParameterAssign: todo
      groupLabel = getLabel(item);
    }
    if (hasProp(prop, item) && typeof item[prop] === "object") {
      flattenQuestionnaire(item[prop], container, groupLabel);
    } else if (prop === "linkId") {
      container.push({ ...item, groupLabel });
    }
  }
};

const convertQuestionnaire = (
  questionnaire: Questionnaire,
  bundle?: Bundle,
): { units: Unit[]; meta: Meta; questionnaire: Questionnaire } => {
  let originalItems = questionnaire.item || [];
  const item: Item[] = [];
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
  // biome-ignore lint/complexity/noForEach: todo
  originalItems.forEach((i) => flattenQuestionnaire(i, item));

  const units = item
    .map((i) => createInputUnit(i, questionnaire, bundle))
    .map((i) => i.unit)
    .filter((i) => !(i.type === itemType.Group));

  return { units, meta, questionnaire };
};

const createMetaInfo = (questionnaire: Questionnaire): string =>
  questionnaire.title
    ? questionnaire.title
    : questionnaire.code?.[0]?.display
      ? questionnaire.code[0].display
      : "";

const createInputUnit = (
  item: Item,
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
  if (item.type === itemType.Choice) {
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
    (resource) => resource.resourceType === ResourceType.Questionnaire,
  );
  if (questionnaire?.resourceType === ResourceType.Questionnaire) {
    return convertQuestionnaire(questionnaire, bundle);
  }
};

const handleResource = (
  resource: Questionnaire | Bundle,
): { units: Unit[]; meta: Meta; questionnaire: Questionnaire } | undefined => {
  if (resource.resourceType === ResourceType.Questionnaire) {
    return convertQuestionnaire(resource);
  }
  if (resource.resourceType === ResourceType.Bundle) {
    return handleBundle(resource);
  }
  console.warn("Resource could not be processed");
};

export const main = (
  resource: Questionnaire | Bundle,
): ConvertedQuestionnaire | null => {
  const convertedQuestionnaire = handleResource(resource);
  if (
    convertedQuestionnaire &&
    (resource.resourceType === ResourceType.Bundle ||
      resource.resourceType === ResourceType.Questionnaire)
  ) {
    return convertedQuestionnaire;
  }
  return null;
};
