import {
  example_1,
  example_2,
  example_3,
  example_4,
  example_5,
  example_6,
  example_7,
} from './examples';
import { Bundle } from './interfaces/bundle';
import { ValueSet } from './interfaces/general';
import { Item, Questionnaire } from './interfaces/questionnaire';

const examples: Array<Questionnaire | Bundle> = [
  example_1,
  example_2,
  example_3,
  example_4,
  example_5,
  example_6,
  example_7,
];

const flattenQuestionnaire = (obj: Item, flatQ: Record<PropertyKey, any>) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object') {
      flattenQuestionnaire(obj[prop], flatQ);
    } else {
      if (prop == 'linkId') {
        flatQ[`Q.${prop.toUpperCase()}_${obj[prop]}`] = obj[prop];
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
  flatQ: Record<PropertyKey, any>
) => {
  if (resource.resourceType === 'Questionnaire') {
    return handleQuestionnaires(resource, flatQ);
  } else if (resource.resourceType === 'Bundle') {
    handleBundle(resource, flatQ);
  } else {
    console.warn('Resource could not be processed');
  }
};

examples.forEach((example) => {
  const flatQ = {};
  handleResource(example, flatQ);
  console.log(flatQ);
  console.log('*'.repeat(40));
});
