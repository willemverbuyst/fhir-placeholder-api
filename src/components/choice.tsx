import React from 'react';
import { Form } from 'react-bootstrap';
import { Item } from '../interfaces/questionnaire';
import { answerValueSet } from '../constants/answerValueSet';

const getValuesFromValueSet = (url: keyof typeof answerValueSet) => {
  const valueSet = answerValueSet[url];
  if (!valueSet) return [];
  const options = valueSet.map((value) => value.display);
  return options;
};

export const Choice: React.FC<{ item: Item }> = ({ item }) => {
  const label =
    item?.text ||
    (item?.code && item.code[0].display) ||
    (item?.code && item.code[0].code) ||
    '';

  const options = item.answerOption
    ? item.answerOption.map((option) => option.valueCoding?.code?.toLowerCase())
    : item.answerValueSet
    ? getValuesFromValueSet(item.answerValueSet)
    : [];

  return (
    <div className="mb-3">
      <Form.Label htmlFor="choice">{label}</Form.Label>
      {options.map((option) => (
        <Form.Check
          key={`inline-${option}`}
          label={option}
          name="choiceGroup"
          type="radio"
          id={`inline-${option}`}
        />
      ))}
    </div>
  );
};
