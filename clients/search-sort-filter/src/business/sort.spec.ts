import { describe, expect, test } from "vitest";
import { genericSort } from "./sort";

const testObject1 = {
  foo: 1,
  bar: "Z_test",
  quuz: true,
};
const testObject2 = {
  foo: 2,
  bar: "A_test",
  quuz: true,
};

describe("genericSort", () => {
  test("should return 1", () => {
    expect(
      genericSort(testObject1, testObject2, {
        property: "foo",
        isDescending: true,
      }),
    ).toBe(1);
    expect(
      genericSort(testObject1, testObject2, {
        property: "bar",
        isDescending: false,
      }),
    ).toBe(1);
  });

  test("should return -1", () => {
    expect(
      genericSort(testObject1, testObject2, {
        property: "foo",
        isDescending: false,
      }),
    ).toBe(-1);
    expect(
      genericSort(testObject1, testObject2, {
        property: "bar",
        isDescending: true,
      }),
    ).toBe(-1);
  });

  test("should return 0", () => {
    expect(
      genericSort(testObject1, testObject2, {
        property: "quuz",
        isDescending: false,
      }),
    ).toBe(0);
    expect(
      genericSort(testObject1, testObject2, {
        property: "quuz",
        isDescending: true,
      }),
    ).toBe(-0);
  });
});
