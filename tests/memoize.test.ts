import { describe, it, expect, vi } from "vitest";

import { memoize } from "../src/functions/memoize";

describe("memoize", () => {
  it("returns correct result", () => {
    const fn = (x: number) => x * 2;
    const memoized = memoize(fn);
    expect(memoized(2)).toEqual(4);
  });

  it("caches result and does not call function again", () => {
    const fn = vi.fn((x: number) => x * 2);

    const memoized = memoize(fn);
    memoized(2);
    memoized(2);

    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("calls function again for different inputs", () => {
    const fn = vi.fn((x: number) => x * 2);

    const memoized = memoize(fn);
    memoized(2);
    memoized(3);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("handles multiple arguments", () => {
    const fn = vi.fn((x: number, y: number) => x + y);

    const memoized = memoize(fn);
    memoized(1, 2);
    memoized(1, 2);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized(1, 2)).toEqual(3);
  });

  it("returns cached value", () => {
    const fn = vi.fn((x: number) => x * 2);

    const memoized = memoize(fn);
    const first = memoized(2);
    const second = memoized(2);

    expect(first).toEqual(second);
  });

  it("handles object arguments", () => {
    const fn = vi.fn((obj: { value: number }) => obj.value * 2);
    const memoized = memoize(fn);
    memoized({ value: 2 });
    memoized({ value: 2 });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
