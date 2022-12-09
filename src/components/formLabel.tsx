import React from 'react';
import { Form } from 'react-bootstrap';

export const FormLabel: React.FC<{ item: any }> = ({ item }) => {
  return <Form.Label htmlFor={item.linkId}>{item.label}</Form.Label>;
};
