/**
 * A function that is called with a value of type T.
 * Used to react to changes in reactive values.
 * @template T - The type of the value passed to the listener.
 * @param {T} value - The current value.
 */
export type Listener<T> = (value: T) => void;