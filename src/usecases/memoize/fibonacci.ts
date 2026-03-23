import { memoize } from "../../functions/memoize";

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

const memoizedFib = memoize(function fibMemo(n: number): number {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
});

console.time("Normal");
console.log(fib(35));
console.timeEnd("Normal");

console.time("Memoized");
console.log(memoizedFib(35));
console.timeEnd("Memoized");
