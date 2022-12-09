import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../form/formLabel';

export const TypeDate: React.FC<{ item: any }> = ({ item }) => {
  return (
    <Form.Group className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="date" />
    </Form.Group>
  );
};
