import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../form/formLabel';
import { Item } from '../../interfaces/questionnaire';

export const TypeDate: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="date" />
    </div>
  );
};
