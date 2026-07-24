// src/browser.ts
import { signalValue, computedValue, deepEqual } from './index';

// Inyectamos todo en el namespace global del navegador
if (typeof window !== 'undefined') {
  (window as any).ReactiveValues = {
    signalValue,
    computedValue,
    deepEqual,
  };
}