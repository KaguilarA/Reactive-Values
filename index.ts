import { signalValue, computedValue } from './src';

const count = signalValue(0);
const doubleCount = computedValue(() => count() * 2, [count]);
const addOne = document.querySelector<HTMLButtonElement>('#addOne')!;
const removeOne = document.querySelector<HTMLButtonElement>('#removeOne')!;
const resetCount = document.querySelector<HTMLButtonElement>('#resetCount')!;

count.effect((val: number) => {
  const htmlElement = document.querySelector<HTMLSpanElement>('#reactiveCounter')!;

  htmlElement.innerHTML = `${val}`;
});

doubleCount.effect((val: number) => {
  const htmlElement = document.querySelector<HTMLSpanElement>('#computedCounter')!;

  htmlElement.innerHTML = `${val}`;
});

removeOne.addEventListener('click', () => {
  count.set(count() - 1);
});

addOne.addEventListener('click', () => {
  count.set(count() + 1);
});

resetCount.addEventListener('click', () => {
  count.set(0);
});