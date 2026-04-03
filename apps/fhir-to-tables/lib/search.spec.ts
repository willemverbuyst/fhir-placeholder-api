import { describe, expect, test } from "vitest";
import { genericSearch } from "./search";

describe("genericSearch", () => {
  test("returns true when query is found in object properties", () => {
    const object = { name: "John", age: 30, email: "doe@example.com" };
    const properties: Array<keyof typeof object> = ["name", "email"];
    const query = "john";
    const shouldBeCaseSensitive = false;

    expect(
      genericSearch(object, properties, query, shouldBeCaseSensitive),
    ).toBe(true);
  });

  test("returns false when query is not found in object properties", () => {
    const object = { name: "John", age: 30, email: "doe@example.com" };
    const properties: Array<keyof typeof object> = ["name", "email"];
    const query = "Jane";
    const shouldBeCaseSensitive = false;

    expect(
      genericSearch(object, properties, query, shouldBeCaseSensitive),
    ).toBe(false);
  });

  test("handles case sensitivity correctly", () => {
    const object = { name: "John", age: 30, email: "doe@example.com" };
    const properties: Array<keyof typeof object> = ["name", "age"];
    const query = "john";
    const shouldBeCaseSensitiveTrue = true;
    const shouldBeCaseSensitiveFalse = false;

    expect(
      genericSearch(object, properties, query, shouldBeCaseSensitiveTrue),
    ).toBe(false);
    expect(
      genericSearch(object, properties, query, shouldBeCaseSensitiveFalse),
    ).toBe(true);
    expect(genericSearch(object, properties, query)).toBe(true);
  });

  test("handles case search for numeric value", () => {
    const object = { name: "John", age: 30, email: "doe@example.com" };
    const properties: Array<keyof typeof object> = ["name", "age"];
    const query = "30";
    const shouldBeCaseSensitive = true;

    expect(
      genericSearch(object, properties, query, shouldBeCaseSensitive),
    ).toBe(true);
  });

  test("handles empty query correctly", () => {
    const object = { name: "John", age: 30, email: "doe@example.com" };
    const properties: Array<keyof typeof object> = ["name", "email"];
    const query = "";
    const shouldBeCaseSensitive = true;

    expect(
      genericSearch(object, properties, query, shouldBeCaseSensitive),
    ).toBe(true);
  });

  test("handles case when value of property is not a string or number", () => {
    const object = {
      name: "John",
      age: 30,
      email: "doe@example.com",
      tested: false,
    };
    const properties: Array<keyof typeof object> = ["name", "email", "tested"];
    const query = "true";

    expect(genericSearch(object, properties, query)).toBe(false);
  });
});
