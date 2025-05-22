import type { Bundle } from "fhir/r5";
import { describe, expect, it } from "vitest";
import {
  getIdFromReference,
  getResourcesFromBundle,
  isBundle,
  isResource,
} from "./fhir";

describe("isBundle", () => {
  it("returns true for a valid Bundle object", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [{ resource: { resourceType: "Patient", id: "1" } }],
    };
    expect(isBundle(bundle)).toBe(true);
  });

  it("returns false for a Resource object", () => {
    const resource = { resourceType: "Patient", id: "1" };
    expect(isBundle(resource)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isBundle(undefined)).toBe(false);
  });

  it("returns false for object without entry property", () => {
    const obj = { resourceType: "Bundle" };
    expect(isBundle(obj)).toBe(false);
  });

  it("returns false for object with entry as undefined", () => {
    const obj = { resourceType: "Bundle", entry: undefined };
    expect(isBundle(obj)).toBe(false);
  });
});
describe("isResource", () => {
  it("returns true for a valid Resource object with id", () => {
    const resource = { resourceType: "Patient", id: "1" };
    expect(isResource(resource)).toBe(true);
  });

  it("returns false for a Bundle object", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [{ resource: { resourceType: "Patient", id: "1" } }],
    };
    expect(isResource(bundle)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isResource(undefined)).toBe(false);
  });

  it("returns false for object without id property", () => {
    const obj = { resourceType: "Patient" };
    expect(isResource(obj)).toBe(false);
  });

  it("returns false for object with id as undefined", () => {
    const obj = { resourceType: "Patient", id: undefined };
    expect(isResource(obj)).toBe(false);
  });
});
describe("getIdFromReference", () => {
  it("returns the id from a valid reference string", () => {
    const reference = { reference: "Patient/123" };
    expect(getIdFromReference(reference)).toBe("123");
  });

  it("returns undefined if reference is undefined", () => {
    expect(getIdFromReference({})).toBeUndefined();
  });

  it("returns undefined if reference does not contain a slash", () => {
    const reference = { reference: "Patient" };
    expect(getIdFromReference(reference)).toBeUndefined();
  });

  it("returns the correct id when reference contains multiple slashes", () => {
    const reference = { reference: "Organization/abc/Patient/456" };
    expect(getIdFromReference(reference)).toBe("abc");
  });

  it("returns empty string if reference ends with a slash", () => {
    const reference = { reference: "Patient/" };
    expect(getIdFromReference(reference)).toBe("");
  });
});
describe("getResourcesFromBundle", () => {
  it("returns an array of resources from a valid Bundle", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 2,
      entry: [
        { resource: { resourceType: "Patient", id: "1" } },
        { resource: { resourceType: "Patient", id: "2" } },
      ],
    };
    const result = getResourcesFromBundle(bundle);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ resourceType: "Patient", id: "1" });
    expect(result[1]).toEqual({ resourceType: "Patient", id: "2" });
  });

  it("returns an empty array if bundle is undefined", () => {
    expect(getResourcesFromBundle(undefined)).toEqual([]);
  });

  it("returns an empty array if bundle is not a Bundle", () => {
    const resource = { resourceType: "Patient", id: "1" };
    // @ts-ignore -force passing a non-bundle object
    expect(getResourcesFromBundle(resource)).toEqual([]);
  });

  it("returns an empty array if bundle.entry is undefined", () => {
    const bundle = { resourceType: "Bundle", entry: undefined };
    // @ts-ignore -force passing a bundle without entry
    expect(getResourcesFromBundle(bundle)).toEqual([]);
  });

  it("skips entries without a resource property", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 2,
      entry: [
        { resource: { resourceType: "Patient", id: "1" } },
        {},
        { resource: { resourceType: "Patient", id: "2" } },
      ],
    };
    const result = getResourcesFromBundle(bundle);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ resourceType: "Patient", id: "1" });
    expect(result[1]).toEqual({ resourceType: "Patient", id: "2" });
  });

  it("returns an empty array if all entries lack resource property", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 2,
      entry: [{}, {}],
    };
    expect(getResourcesFromBundle(bundle)).toEqual([]);
  });
});
