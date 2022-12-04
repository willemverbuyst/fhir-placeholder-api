import React from 'react';
import { FlatQuestionnaire } from '../interfaces/questionnaire';

export const Title: React.FC<{ questionnaire: FlatQuestionnaire }> = ({
  questionnaire,
}) => {
  const title = questionnaire.title
    ? questionnaire.title
    : questionnaire.code
    ? questionnaire.code[0].display
    : '';

  return <h2>{title}</h2>;
};
