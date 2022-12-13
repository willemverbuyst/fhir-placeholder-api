export const ResourceType = {
  Bundle: 'Bundle',
  Organization: 'Organization',
  Patient: 'Patient',
  Questionnaire: 'Questionnaire',
  ValueSet: 'ValueSet',
} as const

export type ResourceType = typeof ResourceType[keyof typeof ResourceType]
