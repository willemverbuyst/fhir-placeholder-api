import React from 'react';
import { Form } from 'react-bootstrap';
import { getLabel } from '../business/label';
import { Item } from '../interfaces/questionnaire';

export const FormLabel: React.FC<{ item: Item }> = ({ item }) => {
  const label = getLabel(item);

  return <Form.Label htmlFor={item.linkId}>{label}</Form.Label>;
};
