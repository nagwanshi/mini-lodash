type AnyObject = Record<string, any>;

export function assign<T extends AnyObject>(obj: T, ...sources: AnyObject[]) {
  if (obj == null || typeof obj !== "object") {
    throw new TypeError("Cannot convert undefined of null to object");
  }

  for (let src of sources) {
    if (src == null) continue; // skip null / undefined
    for (let k of Object.keys(src)) {
      obj[k] = src[k];
    }
  }
  return obj;
}
