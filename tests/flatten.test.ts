import { describe, it, expect } from "vitest";
import { flatten } from "../src/array/flatten";

describe("flatten", () => {
  it("return an array flattened to single level", () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5]);
  });
  it("flattens only one level", () => {
    expect(flatten([1, [2, 3], [4], 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns original array if not nested", () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("returns empty array for nested empty array", () => {
    expect(flatten([[], []])).toEqual([]);
  });

  it("given empty array return empty array", () => {
    expect(flatten([])).toEqual([]);
  });
  it("handles nested empty arrays", () => {
    expect(flatten([1, [], 2])).toEqual([1, 2]);
  });
});
