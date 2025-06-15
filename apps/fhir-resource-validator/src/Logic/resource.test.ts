import { describe, expect, it } from "vitest";
import { findResourceType, getResourceType } from "./resource";

describe("getResourceType", () => {
  it("should return the resourceType when a valid object with the resourceType property is provided", () => {
    const value = { resourceType: "person" };
    const result = getResourceType(value);

    expect(result).toBe("person");
  });

  it("should return null when the value is not a valid object or does not have the resourceType property", () => {
    const value1 = null;
    const value2 = 42;
    const value3 = { name: "John", age: 30 };
    const result1 = getResourceType(value1);
    const result2 = getResourceType(value2);
    const result3 = getResourceType(value3);

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });

  it("should return null when the resourceType property is not a string", () => {
    const value = { resourceType: 123 };
    const result = getResourceType(value);

    expect(result).toBeNull();
  });
});

describe("findResourceType", () => {
  it("should return the correct resource type when a valid value is provided", () => {
    const value = { resourceType: "Flag" };

    const result = findResourceType(value);

    expect(result).toBe("Flag");
  });

  it("should throw an error when an unknown resource type is provided", () => {
    const value = { resourceType: "unknown" };

    expect(() => findResourceType(value)).toThrowError("Unknown resource type");
  });
});
