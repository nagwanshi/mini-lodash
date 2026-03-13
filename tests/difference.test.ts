import { describe, it, expect } from "vitest";
import { difference } from "../src/array/difference";

describe("difference", () => {
  it("returns an array of values from arr1 which are not present in the arr2", () => {
    expect(difference([1, 2], [2, 3])).toEqual([1]);
  });

  it("returns arr1 when arr2 is empty", () => {
    expect(difference([1, 2], [])).toEqual([1, 2]);
  });

  it("returns empty array when arr1 is empty", () => {
    expect(difference([], [2, 3])).toEqual([]);
  });

  it("return empty array when both arrays have same values", () => {
    expect(difference([1, 2], [1, 2])).toEqual([]);
  });
});
