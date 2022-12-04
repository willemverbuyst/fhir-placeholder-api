import React from 'react';
import { Questionnaire } from '../interfaces/questionnaire';

export const Title: React.FC<{ questionnaire: { [key: string]: any } }> = ({
  questionnaire,
}) => {
  const title = questionnaire.title
    ? questionnaire.title
    : questionnaire.code
    ? questionnaire.code[0].display
    : '';

  return <h2>{title}</h2>;
};
