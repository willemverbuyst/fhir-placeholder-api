import React from 'react';
import { Form } from 'react-bootstrap';
import { Item } from '../../interfaces/questionnaire';
import { FormLabel } from '../formLabel';

export const TypeString: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3">
      <FormLabel item={item} />
      <Form.Control id={item.linkId} type="text" />
    </div>
  );
};
