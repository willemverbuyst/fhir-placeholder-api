import { describe, expect, it } from "vitest";
import { getRandomElement } from "./getRandomElement";

describe("getRandomElement", () => {
  it("should return an element from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = getRandomElement(array);
    expect(array).toContain(result);
  });

  it("should throw an error if the array is empty", () => {
    expect(() => getRandomElement([])).toThrow("Array is empty");
  });

  it("should handle arrays with one element", () => {
    const array = [42];
    const result = getRandomElement(array);
    expect(result).toBe(42);
  });

  it("should return different elements on multiple calls (non-deterministic)", () => {
    const array = [1, 2, 3, 4, 5];
    const results = new Set(
      Array.from({ length: 100 }, () => getRandomElement(array)),
    );
    expect(results.size).toBeGreaterThan(1);
  });
});
