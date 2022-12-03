import { examples } from '../examples';
import { Bundle } from '../interfaces/bundle';
import { ValueSet } from '../interfaces/general';
import { Item, Questionnaire } from '../interfaces/questionnaire';

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
  console.log(JSON.stringify(flatQ, null, 4));
  console.log('*'.repeat(40));
});
