import React from 'react';
import { Form } from 'react-bootstrap';
import {
  AnswerOption,
  FlatQuestionnaire,
  Item,
} from '../../interfaces/questionnaire';
import { hardcodedValueSet } from '../../constants/answerValueSet';
import { FormLabel } from '../formLabel';

const getValueSetFromContained = (
  answerValueSet: string,
  questionnaire: FlatQuestionnaire
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
  questionnaire: FlatQuestionnaire
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

export const TypeChoice: React.FC<{
  item: Item;
  questionnaire?: FlatQuestionnaire;
}> = ({ item, questionnaire }) => {
  const options = item.answerOption
    ? getAnswerOptions(item.answerOption)
    : item.answerValueSet && questionnaire
    ? getValueSet(item.answerValueSet, questionnaire)
    : [];

  return (
    <div className="mb-3">
      <FormLabel item={item} />
      {options.length < 4 ? (
        options.map((option) => (
          <Form.Check
            key={`inline-${option}`}
            label={option}
            name={item.linkId}
            type="radio"
            id={`inline-${option}`}
          />
        ))
      ) : (
        <Form.Select>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      )}
    </div>
  );
};
