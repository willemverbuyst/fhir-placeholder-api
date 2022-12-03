import React from 'react';
import { Row } from 'react-bootstrap';

export const Text: React.FC<{ text: string }> = ({ text }) => {
  return <Row>{text}</Row>;
};
