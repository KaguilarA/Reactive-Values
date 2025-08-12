type Listener<T> = (value: T) => void;
type CompareFn<T> = (a: T, b: T) => boolean;

interface ReactiveValue<T> {
  get: () => T;
  set: (value: T) => void;
  effect: (listener: Listener<T>) => Promise<() => boolean>;
}

/**
 * Crea un valor reactivo que permite escuchar y reaccionar a cambios de valor.
 *
 * @template T Tipo del valor almacenado.
 * @param {T} initialValue Valor inicial.
 * @param {CompareFn<T>} [compareFn] Función para comparar el valor anterior y el nuevo. Por defecto compara con ===.
 * @returns {ReactiveValue<T>} Objeto con métodos para obtener, actualizar y escuchar el valor.
 *
 * @example
 * const count = reactiveValue(0);
 * count.effect((value) => console.log(value));
 * count.set(1); // Notifica a los listeners
 */
export default <T>(
  initialValue: T,
  compareFn: CompareFn<T> = (a, b) => a === b
): ReactiveValue<T> => {
  let value = initialValue;
  const listeners = new Set<Listener<T>>();
  /**
   * Notifica a todos los listeners con el valor actual.
   * @private
   */
  const notify = () =>
    listeners.forEach(async (listener) => await listener(value));

  /**
   * Obtiene el valor actual.
   * @returns {T} Valor actual.
   */
  const get = () => value;

  /**
   * Actualiza el valor y notifica a los listeners si el valor cambió.
   * @param {T} newValue Nuevo valor.
   */
  const set = (newValue: T) => {
    if (!compareFn(newValue, value)) {
      value = newValue;
      notify();
    }
  };

  /**
   * Registra un listener que se ejecuta cuando el valor cambia.
   * Devuelve una función para remover el listener.
   * @param {Listener<T>} listener Función que recibe el valor actual.
   * @returns {Promise<() => void>} Función para remover el listener.
   */
  const effect = async (listener: Listener<T>) => {
    listeners.add(listener);
    await listener(value);
    return () => listeners.delete(listener);
  };

  return { get, set, effect };
}