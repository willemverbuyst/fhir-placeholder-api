import { describe, expect, test } from "vitest";
import { genericFilter } from "./filter";

describe("genericFilter", () => {
  test("should return true when filter properties is an empty array", () => {
    const testObject = {
      foo: 1,
      bar: "test",
      quux: true,
      quuz: false,
    };

    expect(genericFilter(testObject, [])).toBe(true);
  });

  test("should return true when all filter properties match", () => {
    const testObject = {
      foo: 1,
      bar: "test",
      quux: true,
      quuz: false,
    };

    expect(
      genericFilter(testObject, [
        { property: "foo", isTruthySelected: true },
        { property: "bar", isTruthySelected: true },
        { property: "quux", isTruthySelected: true },
        { property: "quuz", isTruthySelected: false },
      ]),
    ).toBe(true);
  });

  test("should return false when one filter property does not match", () => {
    const testObject = {
      foo: 1,
      bar: "test",
      quux: true,
      quuz: false,
    };

    expect(
      genericFilter(testObject, [
        { property: "foo", isTruthySelected: true },
        { property: "bar", isTruthySelected: true },
        { property: "quux", isTruthySelected: true },
        { property: "quuz", isTruthySelected: true },
      ]),
    ).toBe(false);
  });
});
