/**
 * Creates an array of array values not included in the other given arrays using
 * SameValueZero for equality comparisons. The order and references of result values
 * are determined by the first array.
 */

// Time complexity O(n*m)
//filter loops through arr1 → O(n)
// includes loops through arr2 → O(m)
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter((item) => !arr2.includes(item));
}
