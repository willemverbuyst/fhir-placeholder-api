type Gender = "male" | "female" | "other" | "unknown" | undefined;

export const GENDER = [
  "male",
  "female",
  "other",
  "unknown",
] as const satisfies NonNullable<Gender>[];
