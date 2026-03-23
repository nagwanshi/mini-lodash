import { memoize } from "../../functions/memoize";

function expansiveCalulation(n: number): number {
  console.log("computing for", n);

  // simulate heavy work
  for (let i = 0; i < 1e8; i++) {}

  return n * 2;
}

const memoized = memoize(expansiveCalulation);

console.time("First call");
console.log(memoized(5));
console.timeEnd("First call");

console.time("Second call");
console.log(memoized(5));
console.timeEnd("Second call");
