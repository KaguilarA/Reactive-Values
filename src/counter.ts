import computedValue from "./values/computedValue";
import reactiveValue from "./values/reactiveValue";

export function setupCounter(element: HTMLButtonElement) {
  const count = reactiveValue(0);
  const doubleCount = computedValue(() => count.get() * 2, [count]);

  const setCounter = (newCount: number) => {
    count.set(newCount);
    element.innerHTML = `count is ${count.get()}`;
    console.log(doubleCount.get());
  }

  element.addEventListener('click', () => setCounter(count.get() + 1))
  setCounter(0)
}
