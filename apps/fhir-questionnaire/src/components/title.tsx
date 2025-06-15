import React from "react";

// biome-ignore lint/suspicious/noExplicitAny: todo
export const Title: React.FC<{ questionnaire: any }> = ({ questionnaire }) => {
  return <h2>{questionnaire.meta.title}</h2>;
};
