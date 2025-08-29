# Reactive Core

![Logo](/public/logo.png)

## What is Reactive Core?

A lightweight and extensible TypeScript library for managing reactive values and computed dependencies. Designed for projects that need reactivity without relying on heavy frameworks.

## Installation

```bash
npm install reactive-core
```

## What's Included?

This library provides types, interfaces, and utilities for building custom reactive systems:

| Module                                   | Description                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `Listener<T>`                            | A function that reacts to value changes                                                             |
| `ReactiveValue<T>`                       | Interface for reactive values with `set`, and `effect` methods                               |
| `ComputedValue<T>`                       | Interface for computed values with `effect` methods                                       |
| `reactiveValue(initialValue, options?)`  | Creates a reactive value with deep equality, batching, and listener support; callable as a function |
| `computedValue(compute, deps, options?)` | Creates a derived value that updates automatically when dependencies change; callable as a function |
| `deepEqual(a, b)`                        | Performs deep equality checks between complex values                                                |

## Core Concepts

### `Listener<T>`

```ts
type Listener<T> = (value: T) => void;
```

A function that runs whenever the reactive value changes. Useful for syncing UI, triggering side effects, or propagating state.

### `ReactiveValue<T>`

```ts
interface ReactiveValue<T> {
  set: (value: T) => void;
  effect: (listener: (value: T) => void) => (() => boolean);
}
```

* `set(value)`: Updates the value and notifies listeners if it changed.
* `effect(listener)`: Registers a listener and immediately invokes it. Returns a function to remove the listener.

#### Options:

```ts
reactiveValue(initialValue, {
  asyncEffect: true;   // Run only effect initial calls asynchronously
  asyncUpdates: true;  // Batch set() updates asynchronously
});
```

### `ComputedValue<T>`

```ts
interface ComputedValue<T> {
  effect: (listener: (value: T) => void) => (() => boolean);
}
```
* `effect(listener)`: Registers a listener and immediately invokes it. Returns a function to remove the listener.

#### Options:

```ts
computedValue(computeFn, deps, {
  asyncEffect: true;   // Run only effect initial calls asynchronously
  asyncUpdates: true;  // Batch computed updates asynchronously
});
```

## How to use

### `reactiveValue(initialValue, options?): ReactiveValue<T> & (() => T)`

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';

const count = reactiveValue(0, { asyncEffect: false, asyncUpdates: true });

count.effect(val => console.log('Count:', val));
count.set(1);
console.log(count()); // callable as function
```

Creates a reactive value with:

* Deep equality comparison using `deepEqual`
* Optional asynchronous batching of updates (`asyncUpdates`)
* Optional asynchronous initial effect calls (`asyncEffect`)
* Callable as a function for shorthand access (`count()`)

### `computedValue(compute, deps, options?): ComputedValue<T> & (() => T)`

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';
import computedValue from 'reactive-core/values/computedValue';

const firstName = reactiveValue('Jhon');
const lastName = reactiveValue('Doe');

const fullName = computedValue(
  () => `${firstName()} ${lastName()}`,
  [firstName, lastName],
  { asyncEffect: false, asyncUpdates: true }
);

fullName.effect((name) => console.log('Full name:', name));
console.log(fullName()); // callable as function
```

Creates a derived reactive value that automatically updates when any dependency changes. Updates are batched asynchronously if `asyncUpdates` is true, and the computed value is callable as a function.

### `deepEqual(a, b): boolean`

```ts
import deepEqual from 'reactive-core/utils/deepEqual';

const isEqual = deepEqual({ a: 1 }, { a: 1 }); // true
```

Performs deep equality checks between two values. Supports:

* Primitives
* Arrays
* Objects
* `Date`, `RegExp`, `Map`, and `Set` instances

## Full Example

```ts
import reactiveValue from 'reactive-core/values/reactiveValue';
import computedValue from 'reactive-core/values/computedValue';

const price = reactiveValue(100);
const quantity = reactiveValue(2);

const total = computedValue(() => price() * quantity(), [price, quantity], {
  asyncEffect: false,
  asyncUpdates: true
});

total.effect(val => console.log('Updated total:', val));

price.set(120);  // "Updated total: 240" (batched async)
quantity.set(3); // "Updated total: 360" (batched async)
```

## Purpose

Reactive Core provides a clean foundation for building reactive systems in TypeScript. It emphasizes simplicity, modularity, and flexibility—perfect for custom UI logic, state management, or animation triggers.

## License
MIT