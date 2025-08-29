import { describe, it, expect } from "vitest";
import { signalValue, computedValue } from "../src";

describe("computedValue", () => {
  it("should compute based on reactiveValue", () => {
    const count = signalValue(2);
    const doubleCount = computedValue(() => count() * 2, [count]);

    expect(doubleCount()).toBe(4);

    count.set(5);
    expect(doubleCount()).toBe(10);
  });

  it("should trigger effects when dependencies change", () => {
    const count = signalValue(1);
    const doubleCount = computedValue(() => count() * 2, [count]);

    let latest = 0;
    doubleCount.effect((val) => {
      latest = val;
    });

    count.set(3);
    expect(latest).toBe(6);

    count.set(10);
    expect(latest).toBe(20);
  });

  it("should work with multiple dependencies", () => {
    const a = signalValue(2);
    const b = signalValue(3);
    const sum = computedValue(() => a() + b(), [a, b]);

    expect(sum()).toBe(5);

    a.set(5);
    expect(sum()).toBe(8);

    b.set(7);
    expect(sum()).toBe(12);
  });

  it("should not recompute if dependencies do not change", () => {
    const count = signalValue(10);
    const doubleCount = computedValue(() => count() * 2, [count]);
    let computeRuns = 0;

    doubleCount.effect(() => computeRuns++);

    expect(doubleCount()).toBe(20);
    expect(computeRuns).toBe(1);

    count.set(10);
    expect(doubleCount()).toBe(20);

    // still only one computation run because value didn’t change
    expect(computeRuns).toBe(1);
  });
});
