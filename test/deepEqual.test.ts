import { describe, it, expect } from "vitest";
import { deepEqual } from "../src";

describe("deepEqual", () => {
  it("should return true for primitive equal values", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("hello", "hello")).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
  });

  it("should return false for primitive unequal values", () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual("a", "b")).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it("should return true for equal arrays", () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([], [])).toBe(true);
  });

  it("should return false for unequal arrays", () => {
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(deepEqual([1, 2, 4], [1, 2, 3])).toBe(false);
  });

  it("should return true for equal objects", () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(deepEqual({}, {})).toBe(true);
  });

  it("should return false for unequal objects", () => {
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it("should handle nested objects", () => {
    expect(
      deepEqual(
        { a: { b: { c: 1 } }, d: [1, 2, 3] },
        { a: { b: { c: 1 } }, d: [1, 2, 3] }
      )
    ).toBe(true);

    expect(
      deepEqual(
        { a: { b: { c: 1 } }, d: [1, 2, 3] },
        { a: { b: { c: 2 } }, d: [1, 2, 3] }
      )
    ).toBe(false);
  });

  it("should handle different types", () => {
    expect(deepEqual(1, "1")).toBe(false);
    expect(deepEqual({}, [])).toBe(false);
    expect(deepEqual([], {})).toBe(false);
  });
});
