// Recursively flattens array.

export function flattenDeep<T>(arr: (T | T[])[]): T[] {
  let ans: T[] = [];

  function flatten(arr: (T | T[])[]) {
    for (const value of arr) {
      if (Array.isArray(value)) {
        flatten(value);
      } else {
        ans.push(value);
      }
    }
  }

  flatten(arr, ans);

  return ans;
}
