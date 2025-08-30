import type { Listener } from "./../types/listener";
import type { ComputedValue, ComputedOptions } from "../interfaces/Computed";
import type { SignalValue } from "../interfaces/Signal";
import deepEqual from "../utils/deepEqual";

/**
 * Creates a computed reactive value that automatically updates when its 
 * dependencies change.
 * Listeners are notified when the computed value changes.
 *
 * @template T
 * @param {() => T} compute - Function to compute the value based on 
 * dependencies.
 * @param {SignalValue<any>[]} deps - Array of reactive values to watch as 
 * dependencies.
 * @param {ComputedOptions} [options] - Options for configuring async effects 
 * and updates.
 * @returns {ComputedValue<T> & (() => T)} The computed reactive value object, 
 * also callable as a function.
 */
export default function <T>(
  compute: () => T,
  deps: SignalValue<any>[],
  options: ComputedOptions = {
    asyncEffect: false,
    asyncUpdates: false
  }
): ComputedValue<T> {
  const { asyncEffect = false, asyncUpdates = false } = options;
  const effects = new Set<Listener<T>>();
  let value: T = compute();
  let scheduled = false;

  /**
   * The computed function, returns the current value.
   * @returns {T} The current computed value.
   */
  const computedFn = (() => value) as ComputedValue<T>;

  /**
   * Notifies listeners if the computed value has changed.
   * Recomputes the value and triggers listeners if necessary.
   */
  function notify() {
    const newValue = compute();
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
  }

  /**
   * Registers a listener that will be called when the computed value changes.
   * The listener is also called immediately with the current value.
   * Returns a function to remove the listener.
   * @param {Listener<T>} listener - The listener function.
   * @returns {() => boolean} Function to remove the listener.
   */
  computedFn.effect = (listener: Listener<T>) => {
    effects.add(listener);
    if (asyncEffect) {
      Promise.resolve().then(() => listener(value));
    } else listener(value);
    return () => effects.delete(listener);
  };

  // Register notify as an effect for each dependency
  deps.forEach((dep) => dep.effect(() => notify()));

  return computedFn;
}