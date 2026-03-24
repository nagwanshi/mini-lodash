import { describe, it, expect, vi } from "vitest";
import { before } from "../src/functions/before";

describe("before", () => {
  it("executes function 2 time when called 3 times and n=3", () => {
    const fn = vi.fn(() => {
      console.log("done");
    });
    const beforeFn = before(3, fn);

    beforeFn();
    beforeFn();
    beforeFn();

    expect(fn).toHaveBeenCalledTimes(2);
  });
  it("executes function 0 time when called 1 times when n = 1", () => {
    const fn = vi.fn((x) => x * 2);
    const beforeFn = before(1, fn);

    beforeFn(2);
    expect(fn).toHaveBeenCalledTimes(0);
  });
  it("calls to the created function returns the result of the last func invocation, if called n or more than n times", () => {
    const fn = vi.fn((x) => x * 2);
    const beforeFn = before(2, fn);
    let first = beforeFn(2);
    beforeFn(2);
    beforeFn(4);
    let second = beforeFn(2);

    expect(first).toEqual(second);
  });

  it("passes arguments and preserves this context", () => {
    const obj = {
      value: 5,
      fn(this: any, x: number) {
        return this.value + x;
      },
    };

    const spy = vi.fn(obj.fn);
    const beforeFn = before(2, spy);

    const result = beforeFn.call(obj, 3);

    expect(spy).toHaveBeenCalledWith(3);
    expect(result).toBe(8);
  });
});
