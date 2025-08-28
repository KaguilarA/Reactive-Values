import type { Listener } from "../types/listener";
import type { ReactiveValue, ReactiveOptions } from "../interfaces/Reactive";
import deepEqual from "../utils/deepEqual";

/**
 * Creates a reactive value object that notifies listeners on changes.
 * Listeners are called when the value changes.
 *
 * @template T
 * @param {T} initialValue - The initial value.
 * @param {ReactiveOptions} [options] - Options for configuring async effects 
 * and updates.
 * @returns {ReactiveValue<T> & (() => T)} The reactive value object, also 
 * callable as a function.
 */
export default function reactiveValue<T>(
  initialValue: T,
  options: ReactiveOptions = {
    asyncEffect: false,
    asyncUpdates: false
  }
): ReactiveValue<T> & (() => T) {
  const effects = new Set<Listener<T>>();
  const { asyncEffect = false, asyncUpdates = false } = options;
  let value: T = initialValue;
  let scheduled = false;

  /**
   * The reactive function, returns the current value.
   * @returns {T} The current value.
   */
  const reactiveFn = (() => value) as ReactiveValue<T> & (() => T);

  /**
   * Sets a new value and notifies listeners if the value changed.
   * @param {T} newValue - The new value to set.
   */
  reactiveFn.set = (newValue: T) => {
    if (!deepEqual(newValue, value)) {
      value = newValue;
      if (asyncUpdates) {
        if (!scheduled) {
          scheduled = true;
          Promise.resolve().then(() => {
            scheduled = false;
            effects.forEach((listener) => listener(value));
          });
        }
      } else {
        effects.forEach((listener) => listener(value));
      }
    }
  };

  /**
   * Registers a listener that will be called when the value changes.
   * The listener is also called immediately with the current value.
   * Returns a function to remove the listener.
   * @param {Listener<T>} listener - The listener function.
   * @returns {() => boolean} Function to remove the listener.
   */
  reactiveFn.effect = (listener: Listener<T>) => {
    effects.add(listener);
    if (asyncEffect) {
      Promise.resolve().then(() => listener(value));
    } else listener(value);
    return () => effects.delete(listener);
  };

  return reactiveFn;
}