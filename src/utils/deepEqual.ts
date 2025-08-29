/**
 * Performs a deep equality check between two values.
 * Supports primitives, arrays, objects, Date, RegExp, Map, and Set.
 * @param {any} a - First value.
 * @param {any} b - Second value.
 * @returns {boolean} True if values are deeply equal, false otherwise.
 */
export default function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a == null || b == null) return a === b;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, valA] of a.entries()) {
      if (!b.has(key)) return false;
      const valB = b.get(key);
      if (!deepEqual(valA, valB)) return false;
    }
    return true;
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const val of a.values()) {
      let found = false;
      for (const otherVal of b.values()) {
        if (deepEqual(val, otherVal)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }

  if (
    typeof a === "object" &&
    typeof b === "object" &&
    Object.getPrototypeOf(a) === Object.prototype &&
    Object.getPrototypeOf(b) === Object.prototype
  ) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEqual(a[key], b[key]));
  }

  return false;
}
