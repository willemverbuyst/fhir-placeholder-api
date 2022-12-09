import React from 'react';
import { Form } from 'react-bootstrap';

export const TypeBoolean: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="mb-3">
      <Form.Check type="checkbox" id={item.linkId} label={item.label} />
    </div>
  );
};
