/**
 * Interface representing a reactive value.
 * @template T
 */
export interface ComputedValue<T> {
  /**
   * Gets the current value.
   * @returns {T} The current value.
   */
  get: () => T;
  /**
   * Registers a listener that reacts to value changes.
   * @param {(value: T) => void} listener - The listener function.
   * @returns {() => boolean} Function to remove the listener.
   */
  effect: (listener: (value: T) => void) => (() => boolean);
}