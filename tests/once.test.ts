import { describe, it, expect, vi } from "vitest";
import { once } from "../src/functions/once";

describe("once", () => {
  it("created function executes only once ", () => {
    const fn = vi.fn((x) => x * 2);
    const onceFn = once(fn);

    onceFn(2);
    onceFn(2);

    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("Repeat calls to the function return the value of the first invocation ", () => {
    const fn = vi.fn((x) => x * 2);
    const onceFn = once(fn);

    const first = onceFn(2);
    const second = onceFn(3);

    expect(first).toEqual(second);
  });

  it("passes arguments and preserves this context", () => {
    let obj = {
      value: 2,
      fn(this: any, x: number) {
        return x + this.value;
      },
    };
    const fn = vi.fn(obj.fn);
    const onceFn = once(fn);
    const result = onceFn.call(obj, 3);
    expect(fn).toHaveBeenCalledWith(3);
    expect(result).toEqual(5);
  });
});
