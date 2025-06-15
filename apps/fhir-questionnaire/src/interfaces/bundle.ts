import { Questionnaire } from "./questionnaire";
import { ValueSet } from "./general";
import { ResourceType } from "./resourceType";

export interface Entry {
  fullUrl: string;
  resource: Questionnaire | ValueSet;
  request?: {
    method: string;
    url: string;
  };
}

export interface Bundle {
  resourceType: typeof ResourceType["Bundle"];
  id: string;
  type?: string;
  entry?: Entry[];
}
