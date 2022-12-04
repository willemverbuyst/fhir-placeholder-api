import React from 'react';
import { Form } from 'react-bootstrap';
import { Item } from '../interfaces/questionnaire';

export const Choice: React.FC<{ item: Item }> = ({ item }) => {
  const answerOption = item.answerOption || [];
  const options = answerOption.map((option) =>
    option.valueCoding?.code?.toLowerCase()
  );
  return (
    <div>
      <Form.Label htmlFor="choice">{item.text}</Form.Label>
      {options.map((option) => (
        <div key={`inline-${option}`} className="mb-3">
          <Form.Check
            inline
            label={option}
            name="choice"
            type="radio"
            id={`inline-${option}-1`}
          />
        </div>
      ))}
    </div>
  );
};
