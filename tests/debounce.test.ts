import { describe, it, expect, vi } from "vitest";

import { debounce } from "../src/functions/debounce";

vi.useFakeTimers();

describe("debounce", () => {
  it("should call function after delay", () => {
    let fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    expect(fn).not.toBeCalled();
    vi.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(1);
  });
  it("should not call function before delay", () => {
    let fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    expect(fn).not.toBeCalled();
    vi.advanceTimersByTime(299);
    expect(fn).toBeCalledTimes(0);
  });
  it("debounce multiple rapid calls", () => {
    let fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    debounced();
    debounced();
    vi.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(1);
  });

  it("should use latest arguments", () => {
    let fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced("h");
    debounced("he");
    debounced("hell");
    debounced("hello");
    vi.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith("hello");
  });

  it("should reset timer on each call", () => {
    let fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced();
    vi.advanceTimersByTime(200);
    expect(fn).not.toBeCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should preserve this context", () => {
    let obj = {
      value: 42,
      fn: vi.fn(function () {
        return this.value;
      }),
    };

    const debounced = debounce(obj.fn, 300);
    obj.fn();

    vi.advanceTimersByTime(200);
    expect(obj.fn).toHaveBeenCalled();
  });

  it("should pass multiple arguments", () => {
    let fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced(1, 2, 3);
    vi.advanceTimersByTime(300);
    expect(fn).toBeCalledWith(1, 2, 3);
  });

  it("handles spaced calls correctly", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced(); // t=0
    vi.advanceTimersByTime(300);

    debounced(); // t=300
    vi.advanceTimersByTime(300);

    expect(fn).toBeCalledTimes(2);
  });

  it("does nothing if never called", () => {
    const fn = vi.fn();
    debounce(fn, 300);

    vi.advanceTimersByTime(300);

    expect(fn).not.toBeCalled();
  });
});
