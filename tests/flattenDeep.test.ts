import { describe, it, expect } from "vitest";
import { flattenDeep } from "../src/array/flattenDeep";

describe("flattenDeep", () => {
  it("returns the new flattened array", () => {
    expect(flattenDeep([1, [2, [3, [4]], 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns empty array for deeply nested empty arrays", () => {
    expect(flattenDeep([[[]], [[], []], []])).toEqual([]);
  });

  it("returns original array if already flattened", () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("doesn't mutate original array", () => {
    let arr = [1, 2, [3]];
    flattenDeep(arr);

    expect(arr).toEqual([1, 2, [3]]);
  });

  it("handles nested empty arrays", () => {
    expect(flattenDeep([1, 2, [], [4]])).toEqual([1, 2, 4]);
  });
  it("flattens deeply nested arrays", () => {
    expect(flattenDeep([[[[1]]]])).toEqual([1]);
  });
});
