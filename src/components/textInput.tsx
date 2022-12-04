import React from 'react';
import { Form } from 'react-bootstrap';
import { Item } from '../interfaces/questionnaire';

export const TextInput: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="mb-3">
      <Form.Label htmlFor="text">{item.text}</Form.Label>
      <Form.Control id="text" type="text" />
    </div>
  );
};
