import { Bundle } from '../interfaces/bundle';
import { ValueSet } from '../interfaces/general';
import {
  AnswerOption,
  Item,
  itemType,
  Questionnaire,
} from '../interfaces/questionnaire';
import { hardcodedValueSet } from '../constants/answerValueSet';
import { getLabel } from './label';

const getValueSetFromContained = (
  answerValueSet: string,
  questionnaire: Questionnaire
): string[] => {
  const contained = questionnaire.contained || [];
  const id = answerValueSet.replace('#', '');
  const resource = contained.find((c: any) => c.id === id);
  const valueSet = resource?.compose?.include[0].concept;
  const names = valueSet.map((v: any) => v.display);

  return names;
};

const getHardcodedValueSet = (
  url: keyof typeof hardcodedValueSet
): string[] => {
  const valueSet = hardcodedValueSet[url];
  if (!valueSet) return [];
  const options = valueSet.map((value) => value.display);
  return options;
};

const getValueSet = (
  answerValueSetkey: string,
  questionnaire: Questionnaire
) => {
  if (answerValueSetkey in hardcodedValueSet) {
    const key = answerValueSetkey as keyof typeof hardcodedValueSet;
    return getHardcodedValueSet(key);
  } else if (answerValueSetkey.startsWith('#')) {
    return getValueSetFromContained(answerValueSetkey, questionnaire);
  } else {
    return [];
  }
};

export const getAnswerOptions = (answerOption: AnswerOption[]) => {
  return answerOption.map((option) => {
    if ('valueCoding' in option) {
      return option.valueCoding.code?.toLowerCase();
    }
  });
};

const getOptions = (item: Item, questionnaire: Questionnaire) => {
  const options = item.answerOption
    ? getAnswerOptions(item.answerOption)
    : item.answerValueSet && questionnaire
    ? getValueSet(item.answerValueSet, questionnaire)
    : [];

  return options;
};

const flattenQuestionnaire = (item: Item, container: any[]) => {
  Object.keys(item).forEach((prop) => {
    // @ts-ignore
    if (typeof item[prop] === 'object') {
      // @ts-ignore
      flattenQuestionnaire(item[prop], container);
    } else {
      if (prop === 'linkId') {
        container.push(item);
      }
    }
  });
};

const convertQuestionnaire = (questionnaire: Questionnaire) => {
  const itemorg = questionnaire.item || [];
  let item: any[] = [];
  itemorg.forEach((i) => flattenQuestionnaire(i, item));

  const items = item
    .map((i) => createInputUnit(i, questionnaire))
    .map((i) => i.unit);

  const meta = createMetaInfo(questionnaire);

  return { items, meta };
};

const createMetaInfo = (questionnaire: Questionnaire) => {
  const title = questionnaire.title
    ? questionnaire.title
    : questionnaire.code
    ? questionnaire.code[0].display
    : '';

  return title;
};

const createInputUnit = (item: Item, questionnaire: Questionnaire) => {
  let unit: Record<string, any> = {};
  let error: string | null = null;

  if (!item.linkId) {
    error = 'linkId missing in one the items';
    console.error(error);
  }

  if (!item.type) {
    error = 'type missing in one the items';
    console.error(error);
  }
  // required properties
  unit.linkId = item.linkId;
  unit.type = item.type;

  // optional properties
  unit.label = getLabel(item);
  unit.readOnly = item.readOnly;
  unit.defaultValue = item.initial;
  unit.required = item.required;

  if (item.type === itemType.choice) {
    unit.options = getOptions(item, questionnaire);
  }

  return { unit, error };
};

// const handleBundle = (bundle: Bundle, flatQ: Record<PropertyKey, any>) => {
//   const entries = bundle.entry || [];
//   const resources = entries.map((entry) => entry.resource);
//   resources.forEach((resource) => handleResource(resource, flatQ));
// };

const handleResource = (resource: Questionnaire | Bundle | ValueSet) => {
  if (resource.resourceType === 'Questionnaire') {
    return convertQuestionnaire(resource);
    // return handleQuestionnaires(resource, items);
    // } else if (resource.resourceType === 'Bundle') {
    //   handleBundle(resource, items);
  } else {
    console.warn('Resource could not be processed');
  }
};

export const main = (resource: Questionnaire | Bundle | ValueSet) => {
  const items = handleResource(resource);
  if (resource.resourceType === 'Questionnaire') {
    return items;
  }
  return null;
};
