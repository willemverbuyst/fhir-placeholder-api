import React from 'react';
import { Form } from 'react-bootstrap';
import { Item } from '../interfaces/questionnaire';
import { FormLabel } from './formLabel';

export const TextInput: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="mb-3">
      <FormLabel item={item} />
      <Form.Control id="text" type="text" />
    </div>
  );
};
