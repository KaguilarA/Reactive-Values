# Reactive Values

[![npm version](https://img.shields.io/npm/v/reactive-values.svg)](https://www.npmjs.com/package/reactive-values)
[![license](https://img.shields.io/npm/l/reactive-values.svg)](https://github.com/KaguilarA/Reactive-Core/blob/main/LICENSE)
[![docs](https://img.shields.io/badge/docs-online-blue)](https://kaguilara.github.io/Reactive-Core/)


## Description

Reactive Values is a lightweight JavaScript & TypeScript library designed to provide a simple and intuitive reactivity system. It allows you to define reactive values, listen to changes, and create computed values with minimal overhead.

---

## Installation

```bash
npm install reactive-values
```

---

## Quick Start

Here’s how you can go from zero to reactive programming in seconds:

```ts
import { SignalValue, ComputedValue } from "reactive-values";

// Step 1: Create a reactive value
const counter = new SignalValue(0);

// Step 2: Listen to changes
counter.effect((value) => {
  console.log("Counter changed:", value);
});

// Step 3: Update the value
counter.set(1); // Console: "Counter changed: 1"
counter.set(2); // Console: "Counter changed: 2"

// Step 4: Create a computed value
const double = new ComputedValue(() => counter.get() * 2);

double.effect((value) => {
  console.log("Double is:", value);
});

// Updates automatically when counter changes
counter.set(3); // Console: "Counter changed: 3" and "Double is: 6"
```

---

## Documentation

[Reactive Values Full documentation](https://kaguilara.github.io/Reactive-Values/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
