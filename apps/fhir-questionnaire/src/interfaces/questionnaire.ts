import { Questionnaire, QuestionnaireItem } from "fhir/r4";
import { Meta, Unit } from "./unit";

export function hasProp(
  key: PropertyKey,
  obj: QuestionnaireItem,
): key is keyof QuestionnaireItem {
  return key in obj;
}

export type ConvertedQuestionnaire = {
  units: Unit[];
  meta: Meta;
  questionnaire: Questionnaire;
};
