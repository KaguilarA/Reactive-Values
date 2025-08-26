import type { Listener } from "../types/listener";
import type { ComputedValue } from "../interface/Computed";
import type { ReactiveValue } from "../interface/Reactive";
import deepEqual from "../utils/deepEqual";

/**
 * Creates a computed reactive value that automatically updates when its dependencies change.
 * @template T
 * @param {() => T} compute - Function to compute the value based on dependencies.
 * @param {ReactiveValue<any>[]} deps - Array of reactive values to watch as dependencies.
 * @returns {ComputedValue<T>} The computed reactive value object.
 */
export default function computedValue<T>(
  compute: () => T,
  deps: ReactiveValue<any>[]
): ComputedValue<T> {
  let value: T = compute();
  const listeners = new Set<Listener<T>>();

  /**
   * Gets the current computed value.
   * @returns {T} The current value.
   */
  function get(): T {
    return value;
  }

  /**
   * Notifies listeners if the computed value has changed.
   * Recomputes the value and triggers listeners if necessary.
   */
  function notify() {
    const newValue = compute();
    if (!deepEqual(newValue, value)) {
      value = newValue;
      listeners.forEach((listener) => Promise.resolve(listener(value)));
    }
  }

  // Register notify as an effect for each dependency
  deps.forEach((dep) => {
    dep.effect(() => notify());
  });

  /**
   * Registers a listener that will be called when the computed value changes.
   * The listener is also called immediately with the current value.
   * Returns a function to remove the listener.
   * @param {Listener<T>} listener - The listener function.
   * @returns {() => boolean} Function to remove the listener.
   */
  function effect(listener: Listener<T>): () => boolean {
    listeners.add(listener);
    Promise.resolve(listener(value));
    return () => listeners.delete(listener);
  }

  return { get, effect };
}