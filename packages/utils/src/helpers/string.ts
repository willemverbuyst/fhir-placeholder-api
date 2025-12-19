export function isString(v: unknown): v is string {
  return typeof v === "string";
}

export function isTruthyString(v: unknown): v is string {
  return Boolean(v) && isString(v);
}
