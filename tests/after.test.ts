import { describe, it, expect, vi } from "vitest";
import { after } from "../src/functions/after";

describe("after", () => {
  it("executes function once after being called 2 times", () => {
    const fn = vi.fn(() => {
      console.log("done");
    });
    const afterFn = after(2, fn);
    afterFn();
    afterFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("executes function once after being called 3 times", () => {
    const fn = vi.fn(() => {
      console.log("done");
    });
    const afterFn = after(2, fn);
    afterFn();
    afterFn();
    afterFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("function is never executed if number of calls does not match the condition", () => {
    const fn = vi.fn(() => {
      console.log("done");
    });
    const afterFn = after(2, fn);
    afterFn();
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
