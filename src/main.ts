import './style.css'
import reactiveValue from './values/reactiveValue';
import computedValue from './values/computedValue';

const count = reactiveValue(0);

const doubleCount = computedValue(() => count.get() * 2, [count]);

function setupCompuedCounter() {
  const htmlElement = document.querySelector<HTMLSpanElement>('#computedCounter')!;

  const setCounter = () => {
    htmlElement.innerHTML = `${doubleCount.get()}`;
  }

  setCounter();
}

function setupReactiveCounter() {
  const htlmElement = document.querySelector<HTMLButtonElement>('#counter')!;
  const setCounter = (newCount: number) => {
    count.set(newCount);
    htlmElement.innerHTML = `count is ${count.get()}`;
  }

  setCounter(count.get());
  setupCompuedCounter();
  htlmElement.addEventListener('click', () => {
    setCounter(count.get() + 1);
    setupCompuedCounter();
  })
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Reactive Core</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      The computed value is <spam id="computedCounter"></spam>
    </p>
  </div>
`

setupReactiveCounter();
