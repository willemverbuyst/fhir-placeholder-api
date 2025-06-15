import React from "react";

export const Title: React.FC<{ questionnaire: any }> = ({ questionnaire }) => {
  return <h2>{questionnaire.meta.title}</h2>;
};
