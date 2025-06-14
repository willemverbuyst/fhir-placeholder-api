import type { Patient } from "fhir/r5";
import { describe, expect, it } from "vitest";
import type { CardRows } from "../config/fhirResources";
import { genericSort, getSortKeys } from "./sort";

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
  it("should return 1", () => {
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

  it("should return -1", () => {
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

  it("should return 0", () => {
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

describe("getSortKeys", () => {
  it("should return keys with sorter property", () => {
    const cardRows: CardRows<Patient> = {
      name: { sorter: true, display: () => "Name" },
      id: { sorter: true, display: () => "ID" },
      birthDate: { sorter: false, display: () => "BirthDate" },
    };
    const result = getSortKeys<Patient>(cardRows);
    expect(result).toContain("name");
    expect(result).toContain("id");
    expect(result.length).toBe(2);
  });

  it("should return an empty array if no sorter properties are present", () => {
    const cardRows: CardRows<Patient> = {
      name: { sorter: false, display: () => "Name" },
      id: { display: () => "ID" },
      birthDate: { display: () => "BirthDate" },
    };
    const result = getSortKeys<Patient>(cardRows);
    expect(result).toEqual([]);
  });

  it("should handle empty input", () => {
    const result = getSortKeys<Patient>({});
    expect(result).toEqual([]);
  });
});
