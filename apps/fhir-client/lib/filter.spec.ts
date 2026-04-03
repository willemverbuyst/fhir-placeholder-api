import type { Organization } from "fhir/r5";
import { describe, expect, it } from "vitest";
import type { CardRows } from "../config/fhir-resources";
import type { MappedResources } from "../interfaces/mapped-resource";
import { genericFilter, getFilterKeys } from "./filter";

describe("genericFilter", () => {
  it("should return true when filter properties is an empty array", () => {
    const testObject = {
      foo: 1,
      bar: "test",
      quux: true,
      quuz: false,
    };

    expect(genericFilter(testObject, [])).toBe(true);
  });

  it("should return true when all filter properties match", () => {
    const testObject = {
      foo: "123",
      bar: "test",
      quux: true,
      quuz: false,
    };

    expect(
      genericFilter(testObject, [
        { property: "foo", value: "123" },
        { property: "bar", value: "test" },
        { property: "quux", value: true },
        { property: "quuz", value: false },
      ]),
    ).toBe(true);
  });

  it("should return false when one filter property does not match", () => {
    const testObject = {
      foo: 1,
      bar: "test",
      quux: true,
      quuz: false,
    };

    expect(
      genericFilter(testObject, [
        { property: "bar", value: "something" },
        { property: "quux", value: true },
      ]),
    ).toBe(false);
  });
});

describe("getFilterKeys", () => {
  const cardRows: CardRows<Organization> = {
    id: { display: () => "123", filter: true },
    active: { display: () => "true", filter: true },
    name: { display: () => "org", filter: false },
  };

  const mappedResources: MappedResources<Organization> = [
    { id: "1", active: "true", name: "foo" },
    { id: "2", active: "false", name: "bar" },
    { id: "3", active: "true", name: "baz" },
    { id: "4", active: "false", name: "foo" },
  ];

  it("should return sets of unique values for filterable keys", () => {
    const result = getFilterKeys(cardRows, mappedResources);

    expect(result.id).toEqual(new Set(["1", "2", "3", "4"]));
    expect(result.active).toEqual(new Set(["true", "false"]));
    expect(result.name).toBeUndefined();
  });

  it("should return empty object if no cardRows have filter enabled", () => {
    const cardRowsNoFilter: CardRows<Organization> = {
      id: { display: () => "123", filter: false },
      active: { display: () => "true", filter: false },
      name: { display: () => "org", filter: false },
    };
    const result = getFilterKeys(cardRowsNoFilter, mappedResources);
    expect(result).toEqual({});
  });

  it("should handle empty mappedResources", () => {
    const result = getFilterKeys(cardRows, []);
    expect(result.id).toEqual(new Set());
    expect(result.active).toEqual(new Set());
    expect(result.name).toBeUndefined();
  });

  it("should skip keys not present in mappedResources", () => {
    const mappedResourcesPartial: MappedResources<Organization> = [
      { id: "1", name: "foo" },
      { id: "2" },
    ];
    const result = getFilterKeys(cardRows, mappedResourcesPartial);
    expect(result.id).toEqual(new Set(["1", "2"]));
    expect(result.active).toEqual(new Set());
    expect(result.name).toBeUndefined();
  });
});
