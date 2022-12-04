import React from 'react';
import { Form } from 'react-bootstrap';
import { Item } from '../interfaces/questionnaire';

export const Integer: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="mb-3">
      <Form.Label htmlFor="integer">{item.text}</Form.Label>
      <Form.Control id="integer" type="number" />
    </div>
  );
};
