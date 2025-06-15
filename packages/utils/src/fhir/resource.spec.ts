import type { Bundle } from "fhir/r5";
import { describe, expect, it } from "vitest";
import { hasId, hasResourceType, isResourceWithId } from "./resource";

describe("hasId", () => {
  it("returns true for a resource with a non-empty id", () => {
    const resource = { resourceType: "Patient", id: "123" };
    expect(hasId(resource)).toBe(true);
  });

  it("returns false for a resource with an empty id", () => {
    const resource = { resourceType: "Patient", id: "" };
    expect(hasId(resource)).toBe(false);
  });

  it("returns false for a resource without an id property", () => {
    const resource = { resourceType: "Patient" };
    expect(hasId(resource)).toBe(false);
  });

  it("returns false for a resource with id as undefined", () => {
    const resource = { resourceType: "Patient", id: undefined };
    expect(hasId(resource)).toBe(false);
  });
});
describe("hasResourceType", () => {
  it("returns true for a resource with a non-empty resourceType", () => {
    const resource = { resourceType: "Patient", id: "123" };
    expect(hasResourceType(resource)).toBe(true);
  });

  it("returns false for a resource with an empty resourceType", () => {
    const resource = { resourceType: "", id: "123" };
    // @ts-ignore -force passing a resource without resourceType
    expect(hasResourceType(resource)).toBe(false);
  });

  it("returns false for a resource without an resourceType property", () => {
    const resource = { id: "123" };
    // @ts-ignore -force passing a resource without resourceType
    expect(hasResourceType(resource)).toBe(false);
  });

  it("returns false for a resource with resourceType as undefined", () => {
    const resource = { resourceType: undefined, id: "123" };
    // @ts-ignore -force passing a resource without resourceType
    expect(hasResourceType(resource)).toBe(false);
  });
});

describe("isResourceWithId", () => {
  it("returns true for a valid Resource object with id", () => {
    const resource = { resourceType: "Patient", id: "1" };
    expect(isResourceWithId(resource)).toBe(true);
  });

  it("returns false for a Bundle object", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [{ resource: { resourceType: "Patient", id: "1" } }],
    };
    expect(isResourceWithId(bundle)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isResourceWithId(undefined)).toBe(false);
  });

  it("returns false for object without id property", () => {
    const obj = { resourceType: "Patient" };
    expect(isResourceWithId(obj)).toBe(false);
  });

  it("returns false for object without resourceType property", () => {
    const obj = { id: "123" };
    // @ts-ignore -force passing a resource without resourceType
    expect(isResourceWithId(obj)).toBe(false);
  });

  it("returns false for object with id as undefined", () => {
    const obj = { resourceType: "Patient", id: undefined };
    expect(isResourceWithId(obj)).toBe(false);
  });
});
