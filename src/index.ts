import example_1 from '../examples/example_1.json';
import example_2 from '../examples/example_2.json';
import example_3 from '../examples/example_3.json';
import example_4 from '../examples/example_4.json';
import example_5 from '../examples/example_5.json';
// import example_6 from '../examples/example_6.json';
import example_7 from '../examples/example_7.json';

const examples: Record<any, any> = [
  example_1,
  example_2,
  example_3,
  example_4,
  example_5,
  // example_6,
  example_7,
];

const flattenQuestionnaire = (obj: Record<PropertyKey, any>) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object') {
      flattenQuestionnaire(obj[prop]);
    } else {
      if (prop == 'linkId') {
        console.log(prop.toUpperCase() + ': ' + obj[prop]);
      }
    }
  });
};

examples.forEach((example) => {
  console.log('************************');
  example.item.filter((i) => flattenQuestionnaire(i));
});
