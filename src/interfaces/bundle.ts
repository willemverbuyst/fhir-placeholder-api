import { Questionnaire } from './questionnaire';
import { ValueSet } from './general';

export interface Entry {
  fullUrl: string;
  resource: Questionnaire | ValueSet;
  request?: {
    method: string;
    url: string;
  };
}

export interface Bundle {
  resourceType: 'Bundle';
  id: string;
  type?: string;
  entry?: Entry[];
}
