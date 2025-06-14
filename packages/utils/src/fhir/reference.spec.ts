import { describe, expect, it } from "vitest";
import { getIdFromReference } from "./reference";

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
