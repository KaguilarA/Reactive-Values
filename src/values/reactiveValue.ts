import type { Listener } from "../types/listener";
import type { ReactiveValue } from "../interface/Reactive";
import deepEqual from "../utils/deepEqual";

/**
 * Creates a reactive value object that notifies listeners on changes.
 * @template T
 * @param {T} initialValue - The initial value.
 * @returns {ReactiveValue<T>} The reactive value object.
 */
export default function reactiveValue<T>(
  initialValue: T,
): ReactiveValue<T> {
  let value: T = initialValue;
  const listeners = new Set<Listener<T>>();

  function get(): T {
    return value;
  }

  function set(newValue: T): void {
    if (!deepEqual(newValue, value)) {
      value = newValue;
      listeners.forEach((listener) => Promise.resolve(listener(value)));
    }
  }

  function effect(listener: Listener<T>): () => boolean {
    listeners.add(listener);
    Promise.resolve(listener(value));
    return () => listeners.delete(listener);
  }

  return { get, set, effect };
}