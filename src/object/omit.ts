type AnyObject = Record<string, any>;
export function omit<T extends AnyObject, k extends keyof T>(
  obj: T,
  paths: k[],
) {
  if (obj == null || obj == undefined) {
    throw TypeError("Cannot create a new object from null and undefined");
  }

  let result = {} as Omit<T, k>;
  const omitSet = new Set<string>(paths as string[]);
  for (const key of Object.keys(obj)) {
    if (!omitSet.has(key)) {
      result[key as keyof Omit<T, k>] = obj[key];
    }
  }
  return result;
}
