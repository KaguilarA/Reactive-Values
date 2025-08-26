import './style.css'
import reactiveValue from './values/reactiveValue';
import computedValue from './values/computedValue';

const count = reactiveValue(0);
const doubleCount = computedValue(() => count() * 2, [count]);

function setupComputedCounter() {
  const htmlElement = document.querySelector<HTMLSpanElement>('#computedCounter')!;

  doubleCount.effect((val) => {
    htmlElement.innerHTML = `${val}`;
  });
}

function setupReactiveCounter() {
  const htmlElement = document.querySelector<HTMLButtonElement>('#counter')!;

  count.effect((val) => {
    htmlElement.innerHTML = `count is ${val}`;
  });

  htmlElement.addEventListener('click', () => {
    count.set(count.get() + 1);
  });

  setupComputedCounter();
}

document.querySelector<HTMLDivElement>('#example')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      The computed value is <span id="computedCounter"></span>
    </p>
  </div>
`;

setupReactiveCounter();

