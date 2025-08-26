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

/**
 * Options for configuring reactive values.
 * @property {boolean} [asyncEffect] - Whether to run effect listeners asynchronously.
 * @property {boolean} [asyncUpdates] - Whether to apply updates asynchronously.
 */
export interface ComputedOptions {
  asyncEffect?: boolean;  // efectos iniciales
  asyncUpdates?: boolean; // efectos al actualizar
}
