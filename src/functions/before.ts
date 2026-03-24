type anyFun = (...args: any[]) => any;

export function before<T extends anyFun>(n: number, fn: T) {
  let count = 0;
  let result: ReturnType<T>;
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    count++;

    if (count < n) {
      result = fn.apply(this, args);
    } else {
      fn = undefined as any; // memory optimisatio, fn can be garbage collected
    }
    return result;
  };
}
