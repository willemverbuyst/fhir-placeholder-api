import example_1 from '../examples/example_1.json';
import example_2 from '../examples/example_2.json';
import example_3 from '../examples/example_3.json';
import example_4 from '../examples/example_4.json';
import example_5 from '../examples/example_5.json';
import example_6 from '../examples/example_6.json';
import example_7 from '../examples/example_7.json';

const examples: Record<any, any> = [
  example_1,
  example_2,
  example_3,
  example_4,
  example_5,
  example_6,
  example_7,
];

const flattenQuestionnaire = (
  obj: Record<PropertyKey, any>,
  flatQ: Record<PropertyKey, any>
) => {
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
  questionnaire: Record<PropertyKey, any>,
  flatQ: Record<PropertyKey, any>
) => {
  questionnaire.item.map((i) => flattenQuestionnaire(i, flatQ));
};

const handleBundle = (
  bundle: Record<PropertyKey, any>,
  flatQ: Record<PropertyKey, any>
) => {
  const entries = bundle.entry || [];
  const resources = entries.map((entry) => entry.resource);
  resources.forEach((resource) => handleResource(resource, flatQ));
};

const handleResource = (
  resource: Record<PropertyKey, any>,
  flatQ: Record<PropertyKey, any>
) => {
  if (resource.resourceType === 'Questionnaire') {
    return handleQuestionnaires(resource, flatQ);
  } else if (resource.resourceType === 'Bundle') {
    handleBundle(resource, flatQ);
  } else {
    console.warn(`resourceType: ${resource.resourceType} not handled`);
  }
};

examples.forEach((example) => {
  const flatQ = {};
  handleResource(example, flatQ);
  console.log(flatQ);
  console.log('*'.repeat(40));
});
