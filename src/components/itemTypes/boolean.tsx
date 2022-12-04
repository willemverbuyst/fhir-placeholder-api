import React from 'react';
import { Form } from 'react-bootstrap';
import { getLabel } from '../../business/label';
import { Item } from '../../interfaces/questionnaire';

export const TypeBoolean: React.FC<{ item: Item }> = ({ item }) => {
  const label = getLabel(item);
  return (
    <div className="mb-3">
      <Form.Check type="checkbox" id="check" label={label} />
    </div>
  );
};
