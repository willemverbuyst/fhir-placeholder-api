// export enum ResourceType {
//   Bundle = 'Bundle',
//   Organization = 'Organization',
//   Patient = 'Patient',
//   Questionnaire = 'Questionnaire',
// }
export const resourceType = {
  Bundle: 'Bundle',
  Organization: 'Organization',
  Patient: 'Patient',
  Questionnaire: 'Questionnaire',
} as const;

export type ResourceType = typeof resourceType[keyof typeof resourceType];
