# 🔄 Reactive Core

A lightweight and extensible TypeScript library for managing reactive values and computed dependencies. Designed for projects that need reactivity without relying on heavy frameworks.

## 🚀 Installation

```bash
npm install reactive-core
```

## 📦 What's Included?

This library provides types, interfaces, and utilities for building custom reactive systems:

| Module | Description |
|--------|-------------|
| `Listener<T>` | A function that reacts to value changes |
| `ReactiveValue<T>` | Interface for reactive values with `get`, `set`, and `effect` methods |
| `reactiveValue(initialValue)` | Creates a reactive value with deep equality and listener support |
| `computedValue(compute, deps)` | Creates a derived value that updates automatically when dependencies change |
| `deepEqual(a, b)` | Performs deep equality checks between complex values |

## 🧠 Core Concepts

### `Listener<T>`

```ts
type Listener<T> = (value: T) => void;
```

A function that runs whenever the reactive value changes. Useful for syncing UI, triggering side effects, or propagating state.

### `ReactiveValue<T>`

```ts
interface ReactiveValue<T> {
  get: () => T;
  set: (value: T) => void;
  effect: (listener: (value: T) => void) => (() => boolean);
}
```

- `get()`: Returns the current value.
- `set(value)`: Updates the value and notifies listeners if it changed.
- `effect(listener)`: Registers a listener and immediately invokes it. Returns a function to remove the listener.

### `reactiveValue(initialValue): ReactiveValue<T>`

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';

const count = reactiveValue(0);
```

Creates a reactive value with:

- Deep equality comparison using `deepEqual`
- Asynchronous listener notification
- Immediate listener invocation on registration

### `computedValue(compute, deps): ReactiveValue<T>`

```ts
import computedValue from 'reactive-core/values/computedValue';

const firstName = reactiveValue('Ana');
const lastName = reactiveValue('Gomez');

const fullName = computedValue(
  () => `${firstName.get()} ${lastName.get()}`,
  [firstName, lastName]
);

fullName.effect((name) => {
  console.log('Full name:', name);
});
```

Creates a derived reactive value that automatically updates when any dependency changes. Cannot be manually set (`set()` throws an error).

### `deepEqual(a, b): boolean`

```ts
import deepEqual from 'reactive-core/utils/deepEqual';

const isEqual = deepEqual({ a: 1 }, { a: 1 }); // true
```

Performs deep equality checks between two values. Supports:

- Primitives
- Arrays
- Objects
- `Date`, `RegExp`, `Map`, and `Set` instances

## 🧪 Full Example

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';
import computedValue from 'reactive-core/values/computedValue';

const price = reactiveValue(100);
const quantity = reactiveValue(2);

const total = computedValue(() => price.get() * quantity.get(), [price, quantity]);

total.effect((val) => {
  console.log('Updated total:', val);
});

price.set(120); // "Updated total: 240"
```

## 🎯 Purpose

Reactive Core provides a clean foundation for building reactive systems in TypeScript. It emphasizes simplicity, modularity, and flexibility—perfect for custom UI logic, state management, or animation triggers.

## 📄 License
