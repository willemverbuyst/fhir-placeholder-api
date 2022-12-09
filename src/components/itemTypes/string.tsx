import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../form/formLabel';

export const TypeString: React.FC<{ item: any }> = ({ item }) => {
  return (
    <Form.Group className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="text" />
    </Form.Group>
  );
};
