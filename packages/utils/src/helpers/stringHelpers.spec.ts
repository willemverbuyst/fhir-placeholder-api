import { describe, expect, it } from "vitest";
import { isString, isTruthyString } from "./stringHelpers";

describe("isString", () => {
  it("should return true for string values", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString("123")).toBe(true);
  });

  it("should return false for non-string values", () => {
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(true)).toBe(false);
  });
});

describe("isTruthyString", () => {
  it("should return true for non-empty string values", () => {
    expect(isTruthyString("hello")).toBe(true);
    expect(isTruthyString("123")).toBe(true);
    expect(isTruthyString(" ")).toBe(true);
  });

  it("should return false for empty strings", () => {
    expect(isTruthyString("")).toBe(false);
  });

  it("should return false for non-string values", () => {
    expect(isTruthyString(123)).toBe(false);
    expect(isTruthyString(null)).toBe(false);
    expect(isTruthyString(undefined)).toBe(false);
    expect(isTruthyString([])).toBe(false);
    expect(isTruthyString({})).toBe(false);
    expect(isTruthyString(true)).toBe(false);
    expect(isTruthyString(0)).toBe(false);
  });
});
