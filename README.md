# Reactive Core

<img src="./public/logo.png" alt="reactiveCore logo" width="120" align="right">

[![Docs](https://img.shields.io/badge/docs-online-blue)](https://kaguilara.github.io/Reactive-Core/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> A lightweight TypeScript library for creating **reactive values** and **computed signals**, inspired by Angular Signals.

---

## 📦 Installation

```bash
npm install reactive-core
```

Or with yarn:

```bash
yarn add reactive-core
```

---

## 🚀 Quick Start

### ReactiveValue

```ts
import { ReactiveValue } from "reactive-core";

// Create a reactive value
const count = new ReactiveValue(0);

// Subscribe to changes
count.subscribe((value) => {
  console.log("Count changed:", value);
});

// Update the value
count.set(count.get() + 1);
// → logs "Count changed: 1"
```

---

### ComputedValue

```ts
import { ReactiveValue, ComputedValue } from "reactive-core";

// Reactive sources
const firstName = new ReactiveValue("Kevin");
const lastName = new ReactiveValue("Aguilar");

// Computed value derived from others
const fullName = new ComputedValue(() => {
  return `${firstName.get()} ${lastName.get()}`;
});

// Subscribe to computed updates
fullName.subscribe((value) => {
  console.log("Full name:", value);
});

// Trigger reactivity
firstName.set("Jaime");
// → logs "Full name: Jaime Aguilar"
```

---

## 📘 Documentation

👉 Full docs available at:  
[https://kaguilara.github.io/Reactive-Core/](https://kaguilara.github.io/Reactive-Core/)

---

## ⚖️ License

MIT © [Kevin Aguilar](https://github.com/KaguilarA)
