# 🔄 Reactive Core

Una librería ligera y extensible para manejar valores reactivos en TypeScript. Ideal para proyectos que requieren reactividad sin frameworks pesados, con soporte para valores derivados y comparación profunda.

## 🚀 Instalación

```bash
npm install reactive-core
```

## 📦 ¿Qué incluye?

Esta librería expone tipos, interfaces y utilidades para construir sistemas reactivos personalizados:

| Módulo | Descripción |
|--------|-------------|
| `Listener<T>` | Función que reacciona a cambios de valor |
| `ReactiveValue<T>` | Interfaz para valores reactivos con métodos para obtener, actualizar y escuchar cambios |
| `reactiveValue(initialValue)` | Implementación de `ReactiveValue<T>` con listeners y comparación profunda |
| `computedValue(compute, deps)` | Valor derivado que se actualiza automáticamente al cambiar sus dependencias |
| `deepEqual(a, b)` | Función para comparar profundamente dos valores |

## 🧠 Conceptos clave

### `Listener<T>`

```ts
type Listener<T> = (value: T) => void;
```

Función que se ejecuta cada vez que el valor reactivo cambia. Ideal para actualizar UI, sincronizar estados, o disparar efectos secundarios.

### `ReactiveValue<T>`

```ts
interface ReactiveValue<T> {
  get: () => T;
  set: (value: T) => void;
  effect: (listener: (value: T) => void) => (() => boolean);
}
```

- `get()`: obtiene el valor actual.
- `set(value)`: actualiza el valor y notifica a los listeners si cambió.
- `effect(listener)`: registra un listener que se ejecuta en cada cambio. Retorna una función para removerlo.

### `reactiveValue(initialValue): ReactiveValue<T>`

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';

const count = reactiveValue(0);
```

Crea una instancia de `ReactiveValue<T>` con:

- Comparación profunda usando `deepEqual`
- Notificación asíncrona a los listeners
- Ejecución inmediata del listener al registrarse

### `computedValue(compute, deps): ReactiveValue<T>`

```ts
import computedValue from 'reactive-core/values/computedValue';

const firstName = reactiveValue('Ana');
const lastName = reactiveValue('Gómez');

const fullName = computedValue(
  () => `${firstName.get()} ${lastName.get()}`,
  [firstName, lastName]
);

fullName.effect((name) => {
  console.log('Nombre completo:', name);
});
```

Crea un valor derivado que se actualiza automáticamente cuando cambian sus dependencias. No puede modificarse directamente (`set()` lanza error).

### `deepEqual(a, b): boolean`

```ts
import deepEqual from 'reactive-core/utils/deepEqual';

const isEqual = deepEqual({ a: 1 }, { a: 1 }); // true
```

Realiza una comparación profunda entre dos valores. Soporta:

- Primitivos
- Arrays
- Objetos
- Instancias de `Date`, `RegExp`, `Map`, y `Set`

## 🧪 Ejemplo completo

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';
import computedValue from 'reactive-core/values/computedValue';

const price = reactiveValue(100);
const quantity = reactiveValue(2);

const total = computedValue(() => price.get() * quantity.get(), [price, quantity]);

total.effect((val) => {
  console.log('Total actualizado:', val);
});

price.set(120); // "Total actualizado: 240"
```

## 🛠️ Objetivo

Esta librería busca ofrecer una base sólida para construir sistemas reactivos personalizados, manteniendo la simplicidad y flexibilidad para integrarse en cualquier stack moderno.

## 📄 Licencia

MIT
