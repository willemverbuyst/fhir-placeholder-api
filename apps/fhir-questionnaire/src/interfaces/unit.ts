import type { Coding, QuestionnaireItem } from "fhir/r4";

export type Unit = {
  linkId: string;
  type: QuestionnaireItem["type"];
  label: string;
  defaultValue?: unknown;
  required: boolean;
  readOnly: boolean;
  options?: Coding[];
  groupLabel?: string;
};

export type Meta = {
  title: string;
  subTitle: string;
};
