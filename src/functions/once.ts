type anyFunction = (...args: any[]) => any;

export function once<T extends anyFunction>(fn: T) {
  let called = false;
  let result: ReturnType<T>;
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
      fn = undefined as any;
    }
    return result;
  };
}
