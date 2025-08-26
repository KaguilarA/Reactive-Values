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

  /**
   * Gets the current value.
   * @returns {T} The current value.
   */
  function get(): T {
    return value;
  }

  /**
   * Sets a new value and notifies listeners if the value changed.
   * @param {T} newValue - The new value to set.
   */
  function set(newValue: T): void {
    if (!deepEqual(newValue, value)) {
      value = newValue;
      listeners.forEach((listener) => Promise.resolve(listener(value)));
    }
  }

  /**
   * Registers a listener that will be called when the value changes.
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

  return { get, set, effect };
}