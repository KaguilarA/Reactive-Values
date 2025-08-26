/**
 * Interface representing a reactive value.
 * @template T
 */
export interface ReactiveValue<T> {
  /**
   * Gets the current value.
   * @returns {T} The current value.
   */
  get: () => T;
  /**
   * Sets a new value and notifies listeners if the value changed.
   * @param {T} value - The new value to set.
   */
  set: (value: T) => void;
  /**
   * Registers a listener that reacts to value changes.
   * @param {(value: T) => void} listener - The listener function.
   * @returns {() => boolean} Function to remove the listener.
   */
  effect: (listener: (value: T) => void) => (() => boolean);
}


/**
 * Options for configuring reactive values.
 * @property {boolean} [asyncEffect] - Whether to run effect listeners asynchronously.
 * @property {boolean} [asyncUpdates] - Whether to apply updates asynchronously.
 */
export interface ReactiveOptions {
  asyncEffect?: boolean;
  asyncUpdates?: boolean;
}