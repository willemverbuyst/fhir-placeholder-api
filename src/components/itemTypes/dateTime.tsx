import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../formLabel';

export const TypeDateTime: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="datetime-local" />
    </div>
  );
};
