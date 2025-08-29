# Reactive Core

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://kaguilara.github.io/Reactive-Core/)

## Description

Reactive Core is a lightweight TypeScript library designed to provide a simple and intuitive reactivity system, inspired by Angular signals and other reactive paradigms. It allows you to define reactive values, listen to changes, and create computed values with minimal overhead.

---

## Installation

```bash
npm install reactive-core
```

---

## Quick Start

Here’s how you can go from zero to reactive programming in seconds:

```ts
import { ReactiveValue, ComputedValue } from "reactive-core";

// Step 1: Create a reactive value
const counter = new ReactiveValue(0);

// Step 2: Listen to changes
counter.subscribe((value) => {
  console.log("Counter changed:", value);
});

// Step 3: Update the value
counter.set(1); // Console: "Counter changed: 1"
counter.set(2); // Console: "Counter changed: 2"

// Step 4: Create a computed value
const double = new ComputedValue(() => counter.get() * 2);

double.subscribe((value) => {
  console.log("Double is:", value);
});

// Updates automatically when counter changes
counter.set(3); // Console: "Counter changed: 3" and "Double is: 6"
```

---

## Documentation

📖 Full documentation is available at: [Reactive Core Docs](https://kaguilara.github.io/Reactive-Core/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
