// Core reactive value
export { default as signalValue } from "./core/signalValue";

// Computed values
export { default as computedValue } from "./core/computedValue";

// Utils
export { default as deepEqual } from "./utils/deepEqual";

// Types & Interfaces
export type { Listener } from './types/listener';
export type { SignalValue as ReactiveValue, SignalOptions as ReactiveOptions } from "./interfaces/Signal";
export type { ComputedValue, ComputedOptions } from "./interfaces/Computed";
