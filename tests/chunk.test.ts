import { describe, it, expect } from "vitest";
import { chunk } from "../src/array/chunk";

describe("chunk", () => {
  it("splits array into chunks", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
