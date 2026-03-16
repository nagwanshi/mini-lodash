import { describe, it, expect } from "vitest";
import { flattenDepth } from "../src/array/flattenDepth";

describe("flattenDepth", () => {
  it("Recursively flatten array up to 1 times.", () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 1)).toEqual([1, 2, [3, [4]], 5]);
  });
  it("Recursively flatten array up to 0 times.", () => {
    expect(flattenDepth([1, [2, [3]]], 0)).toEqual([1, [2, [3]]]);
  });
  it("Recursively flatten array up to 2 times.", () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 2)).toEqual([1, 2, 3, [4], 5]);
  });
  it("Returns deeply flattened array if given depth is greater than or equal to actual recursion depth", () => {
    expect(flattenDepth([1, [2, [3, [4]], 5]], 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("Recursively flatten array of nested empty arrays up to 1 times. ", () => {
    expect(flattenDepth([[], [[], []]], 1)).toEqual([[], []]);
  });
  it("Recursively flatten array of nested empty arrays up to 2 times. ", () => {
    expect(flattenDepth([[], [[], []]], 2)).toEqual([]);
  });
  it("does not mutate original array", () => {
    const arr = [1, [2, [3]]];
    flattenDepth(arr, 2);

    expect(arr).toEqual([1, [2, [3]]]);
  });
  it("returns same array when array is already flat", () => {
    expect(flattenDepth([1, 2, 3], 2)).toEqual([1, 2, 3]);
  });
});
