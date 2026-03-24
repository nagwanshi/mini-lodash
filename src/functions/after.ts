type anyFunction = (...args: any[]) => any;

export function after<T extends anyFunction>(n: number, fn: T) {
  let count = 0;
  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    count++;
    if (count >= n) {
      return fn.apply(this, args);
    }
  };
}
