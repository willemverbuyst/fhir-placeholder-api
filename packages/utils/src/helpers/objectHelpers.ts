export function typedEntries<T extends Record<string, unknown>>(
  obj: T,
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function typedKeys<T extends Record<string, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function typedValues<T extends Record<string, unknown>>(
  obj: T,
): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

export function hasKey<
  O extends Record<string, unknown>,
  K extends PropertyKey,
>(obj: O, key: K): key is K & keyof O {
  return Object.hasOwn(obj, key);
}

export function hasKeyWithValue<
  O extends Record<string, unknown>,
  K extends keyof O,
>(obj: O, key: K): obj is O & Record<K, NonNullable<O[K]>> {
  return hasKey(obj, key) && obj[key] !== undefined && obj[key] !== null;
}

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isEmptyObject(
  value: unknown,
): value is Record<string, unknown> {
  return isPlainObject(value) && Object.keys(value).length === 0;
}
