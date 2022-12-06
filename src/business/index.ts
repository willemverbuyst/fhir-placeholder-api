import { Bundle } from '../interfaces/bundle';
import { ValueSet } from '../interfaces/general';
import {
  FlatQuestionnaire,
  Item,
  Questionnaire,
} from '../interfaces/questionnaire';

const flattenQuestionnaire = (
  obj: Item,
  flatQ: Record<PropertyKey, any>,
  groupId = ''
) => {
  Object.keys(obj).forEach((prop) => {
    let newGroupId = groupId;
    if (obj.type === 'group') {
      newGroupId = `GROUPID__${obj.linkId}`;
    }
    //@ts-ignore
    if (typeof obj[prop] === 'object') {
      //@ts-ignore
      flattenQuestionnaire(obj[prop], flatQ, newGroupId);
    } else {
      if (prop === 'linkId') {
        const { item, ...objectWithoutItemProp } = obj;
        flatQ[`ITEMID_${obj[prop]}_${newGroupId}`] = {
          group: newGroupId,
          item: objectWithoutItemProp,
        };
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
): { [key: string]: { groupId: string; item: Item } } => {
  const items: { [key: string]: { groupId: string; item: Item } } = {};
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
