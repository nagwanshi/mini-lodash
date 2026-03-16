export function flattenDepth<T>(arr: (T | T[])[], depth: number): (T | T[])[] {
  let ans: (T | T[])[] = [];
  //   [1,2,3,[4],5];

  if (!Array.isArray(arr)) return [];

  function flattenHelper(arr: (T | T[])[], depth: number) {
    //[1, [2, [3, [4]], 5]], 2

    for (let value of arr) {
      if (Array.isArray(value) && depth > 0) {
        flattenHelper(value, depth - 1);
      } else {
        ans.push(value);
      }
    }
  }

  flattenHelper(arr, depth);

  return ans;
}
