import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../formLabel';
import { Item } from '../../interfaces/questionnaire';

export const TypeDateTime: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="datetime-local" />
    </div>
  );
};
