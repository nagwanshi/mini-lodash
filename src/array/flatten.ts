export function flatten<T>(arr: (T | T[])[]): T[] {
  if (!Array.isArray(arr)) return [];

  const result: T[] = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      for (const value of item) {
        result.push(value);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

// T.C. - O(n)
