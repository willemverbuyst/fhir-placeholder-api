export const ConditionClinicalStatus = {
  ACTIVE: "active",
  RECURRENCE: "recurrence",
  RELAPSE: "relapse",
  INACTIVE: "inactive",
  REMISSION: "remission",
  RESOLVED: "resolved",
  UNKNOWN: "unknown",
} as const;

export type ConditionClinicalStatus =
  (typeof ConditionClinicalStatus)[keyof typeof ConditionClinicalStatus];
