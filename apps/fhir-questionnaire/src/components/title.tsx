import React from "react";
import type { ConvertedQuestionnaire } from "../interfaces/questionnaire";

export const Title: React.FC<{ questionnaire: ConvertedQuestionnaire }> = ({
  questionnaire,
}) => {
  return <h2>{questionnaire.meta.title}</h2>;
};
