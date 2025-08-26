import type { Listener } from "../types/listener";
import type { ReactiveValue } from "../interface/Reactive";
import deepEqual from "../utils/deepEqual";

/**
 * Creates a computed reactive value derived from one or more reactive sources.
 * @template T
 * @param {() => T} compute - Function that computes the value.
 * @param {ReactiveValue<any>[]} deps - Dependencies to watch.
 * @returns {ReactiveValue<T>} A read-only reactive value.
 */
export default function computedValue<T>(
  compute: () => T,
  deps: ReactiveValue<any>[]
): ReactiveValue<T> {
  let value: T = compute();
  const listeners = new Set<Listener<T>>();

  function get(): T {
    return value;
  }

  // No set → read-only
  function set(_: T): void {
    throw new Error("Cannot set value of a computed reactive value.");
  }

  function notify() {
    const newValue = compute();
    if (!deepEqual(newValue, value)) {
      value = newValue;
      listeners.forEach((listener) => Promise.resolve(listener(value)));
    }
  }

  // Suscribirse a cambios de cada dependencia
  deps.forEach((dep) => {
    dep.effect(() => notify());
  });

  function effect(listener: Listener<T>): () => boolean {
    listeners.add(listener);
    Promise.resolve(listener(value));
    return () => listeners.delete(listener);
  }

  return { get, set, effect };
}
