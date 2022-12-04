import { Bundle } from '../interfaces/bundle';
import { ValueSet } from '../interfaces/general';
import {
  FlatQuestionnaire,
  Item,
  Questionnaire,
} from '../interfaces/questionnaire';

const flattenQuestionnaire = (obj: Item, flatQ: Record<PropertyKey, any>) => {
  Object.keys(obj).forEach((prop) => {
    //@ts-ignore
    if (typeof obj[prop] === 'object') {
      //@ts-ignore
      flattenQuestionnaire(obj[prop], flatQ);
    } else {
      if (prop == 'linkId') {
        const { item, ...objectWithoutItemProp } = obj;
        flatQ[`Q.${prop.toUpperCase()}_${obj[prop]}`] = objectWithoutItemProp;
      }
    }
  });
};

const handleQuestionnaires = (
  questionnaire: Questionnaire,
  flatQ: Record<PropertyKey, any>
) => {
  questionnaire.item.map((i) => flattenQuestionnaire(i, flatQ));
};

const handleBundle = (bundle: Bundle, flatQ: Record<PropertyKey, any>) => {
  const entries = bundle.entry || [];
  const resources = entries.map((entry) => entry.resource);
  resources.forEach((resource) => handleResource(resource, flatQ));
};

const handleResource = (
  resource: Questionnaire | Bundle | ValueSet,
  items: Record<PropertyKey, any>
) => {
  if (resource.resourceType === 'Questionnaire') {
    return handleQuestionnaires(resource, items);
  } else if (resource.resourceType === 'Bundle') {
    handleBundle(resource, items);
  } else {
    console.warn('Resource could not be processed');
  }
};

export const flattenItems = (
  resource: Questionnaire | Bundle | ValueSet
): { [key: string]: Item } => {
  const items: { [key: string]: Item } = {};
  handleResource(resource, items);
  return items;
};

export const main = (
  resource: Questionnaire | Bundle | ValueSet
): FlatQuestionnaire | null => {
  const itemFlattened = flattenItems(resource);
  if (resource.resourceType === 'Questionnaire') {
    return { ...resource, item: itemFlattened };
  }
  return null;
};
