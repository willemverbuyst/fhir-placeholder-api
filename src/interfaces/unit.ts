import { ItemType } from './questionnaire';

export type Unit = {
  linkId: string;
  type: ItemType;
  label: string;
  defaultValue?: unknown;
  required: boolean;
  readOnly: boolean;
  options?: string[];
};
