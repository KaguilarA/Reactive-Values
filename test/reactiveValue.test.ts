import { describe, it, expect } from "vitest";
import { signalValue } from "../src";

describe("reactiveValue", () => {
  it("should initialize with the given value", () => {
    const count = signalValue(5);
    expect(count()).toBe(5);
  });

  it("should update the value with set()", () => {
    const count = signalValue(0);
    count.set(10);
    expect(count()).toBe(10);
  });

  it("should trigger effects on change", () => {
    const count = signalValue(1);
    let triggered = 0;
    count.effect((val) => {
      triggered = val;
    });
    count.set(42);
    expect(triggered).toBe(42);
  });
});
