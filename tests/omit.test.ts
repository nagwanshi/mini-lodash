import { describe, it, expect } from "vitest";
import { omit } from "../src/object/omit";

describe("omit", () => {
  it("omits specified keys", () => {
    const result = omit({ a: 1, b: 2, c: 3 }, ["a", "c"]);
    expect(result).toEqual({ b: 2 });
  });

  it("contains  only enumerable properties", () => {
    const obj = { a: 1, b: 2 };
    Object.defineProperty(obj, "c", {
      value: 3,
      enumerable: false,
    });

    const result = omit(obj, ["b", "c"]);

    expect(result).toEqual({ a: 1 });
  });
});
