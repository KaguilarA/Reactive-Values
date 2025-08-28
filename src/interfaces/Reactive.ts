/**
 * Interface representing a reactive value.
 * @template T
 */
export interface ReactiveValue<T> {
  /**
   * Gets the current value.
   */
  (): T;
  /**
   * Sets a new value and notifies listeners if the value changed.
   * @param value The new value to set.
   */
  set: (value: T) => void;
  /**
   * Registers a listener that reacts to value changes.
   * @param listener The listener function.
   * @returns Function to remove the listener.
   */
  effect: (listener: (value: T) => void) => (() => boolean);
}

/**
 * Options for configuring reactive values.
 * @property asyncEffect Whether to run effect listeners asynchronously.
 * @property asyncUpdates Whether to apply updates asynchronously.
 */
export interface ReactiveOptions {
  asyncEffect?: boolean;
  asyncUpdates?: boolean;
}