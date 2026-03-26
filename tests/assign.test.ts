import { describe, it, expect } from "vitest";

import { assign } from "../src/object/assign";

describe("assign- basic", () => {
  it("copies properties from one source", () => {
    const target = { a: 1 };
    const result = assign(target, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
    expect(result).toBe(target); // mutation check
  });

  it("copies properties from multiple source", () => {
    const result = assign({}, { a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe("assign - overwrite", () => {
  it("overwrites existing keys", () => {
    const result = assign({ a: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2 });
  });

  it("last source wins", () => {
    const result = assign({}, { a: 1 }, { a: 2 }, { a: 3 });
    expect(result).toEqual({ a: 3 });
  });
});

describe("assign - null and undefined", () => {
  it("skips null and undefined sources", () => {
    const result = assign({}, null as any, undefined as any, { a: 1 });
    expect(result).toEqual({ a: 1 });
  });

  it("throws if target is null or undefined", () => {
    expect(() => assign(null as any, { a: 1 })).toThrow();
    expect(() => assign(undefined as any, { a: 1 })).toThrow();
  });
});

describe("assign - own properties only", () => {
  it("does not copy prototype properties", () => {
    const proto = { inherited: 1 };
    const src = Object.create(proto);
    src.own = 2;

    const result = assign({}, src);
    expect(result).toEqual({ own: 2 });
  });
});

describe("assign - enumerable properties", () => {
  it("copies only enumerable properties", () => {
    const src: any = {};
    Object.defineProperty(src, "hidden", {
      value: 42,
      enumerable: false,
    });
    src.visible = 1;
    const result = assign({}, src);
    expect(result).toEqual({ visible: 1 });
  });
});

describe("assign - primitive sources", () => {
  it("handles string source", () => {
    const result = assign({}, "abc" as any);

    expect(result).toEqual({
      0: "a",
      1: "b",
      2: "c",
    });
  });

  it("ignores number source", () => {
    const result = assign({}, 123 as any);
    expect(result).toEqual({});
  });
});
