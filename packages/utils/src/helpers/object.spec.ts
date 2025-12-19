import { describe, expect, it } from "vitest";
import {
  hasKey,
  hasKeyWithValue,
  isEmptyObject,
  isObject,
  typedEntries,
  typedKeys,
  typedValues,
} from ".";

describe("typedEntries", () => {
  it("should return typed entries for an object", () => {
    const obj = { name: "John", age: 30, active: true };
    const entries = typedEntries(obj);

    expect(entries).toEqual([
      ["name", "John"],
      ["age", 30],
      ["active", true],
    ]);
  });

  it("should return empty array for empty object", () => {
    const obj = {};
    const entries = typedEntries(obj);

    expect(entries).toEqual([]);
  });
});

describe("typedKeys", () => {
  it("should return typed keys for an object", () => {
    const obj = { name: "John", age: 30, active: true };
    const keys = typedKeys(obj);

    expect(keys).toEqual(["name", "age", "active"]);
  });

  it("should return empty array for empty object", () => {
    const obj = {};
    const keys = typedKeys(obj);

    expect(keys).toEqual([]);
  });
});

describe("typedValues", () => {
  it("should return typed values for an object", () => {
    const obj = { name: "John", age: 30, active: true };
    const values = typedValues(obj);

    expect(values).toEqual(["John", 30, true]);
  });

  it("should return empty array for empty object", () => {
    const obj = {};
    const values = typedValues(obj);

    expect(values).toEqual([]);
  });
});

describe("hasKey", () => {
  it("should return true if key exists in object", () => {
    const obj = { name: "John", age: 30 };

    expect(hasKey(obj, "name")).toBe(true);
    expect(hasKey(obj, "age")).toBe(true);
  });

  it("should return false if key does not exist in object", () => {
    const obj = { name: "John", age: 30 };

    expect(hasKey(obj, "email")).toBe(false);
  });
});

describe("hasKeyWithValue", () => {
  it("should return true if key exists and has non-null/undefined value", () => {
    const obj = { name: "John", age: 30, active: true };

    expect(hasKeyWithValue(obj, "name")).toBe(true);
    expect(hasKeyWithValue(obj, "age")).toBe(true);
    expect(hasKeyWithValue(obj, "active")).toBe(true);
  });

  it("should return false if key has null value", () => {
    const obj = { name: null, age: 30 };

    expect(hasKeyWithValue(obj, "name")).toBe(false);
  });

  it("should return false if key has undefined value", () => {
    const obj = { name: undefined, age: 30 };

    expect(hasKeyWithValue(obj, "name")).toBe(false);
  });
});

describe("isObject", () => {
  it("should return true for plain objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ name: "John" })).toBe(true);
  });

  it("should return false for arrays", () => {
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
  });

  it("should return false for null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("should return false for primitives", () => {
    expect(isObject("string")).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe("isEmptyObject", () => {
  it("should return true for empty objects", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("should return false for non-empty objects", () => {
    expect(isEmptyObject({ name: "John" })).toBe(false);
  });

  it("should return false for non-objects", () => {
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
    expect(isEmptyObject("string")).toBe(false);
    expect(isEmptyObject(123)).toBe(false);
  });
});
