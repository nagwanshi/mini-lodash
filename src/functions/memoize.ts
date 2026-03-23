/*
 * Simple implementation of memoize function
 */

// export function memoize<T extends (...args: any[]) => any>(func: T) {
//   const cache = new Map<string, ReturnType<T>>();

//   return function (this: any, ...args: Parameters<T>): ReturnType<T> {
//     const key = JSON.stringify(args);

//     if (cache.has(key)) {
//       return cache.get(key)!;
//     }
//     const result = func.call(this, ...args);
//     cache.set(key, result);
//     return result;
//   };
// }

/**
 * Advance implementation of memoize function (with resolver + cache customization))
 */

type AnyFunction = (...args: any[]) => any;

export function memoize<T extends AnyFunction>(
  func: T,
  resolver?: (...args: Parameters<T>) => string,
) {
  const cache = new (memoize.Cache as MapConstructor)<string, ReturnType<T>>();
  // const cache = new Map<string, ReturnType<T>>();

  function memoized(this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }
  memoized.cache = cache;

  return memoized as T & { cache: typeof cache };
}

memoize.Cache = Map;
