import Notiflix from 'notiflix';

const form = document.querySelector('form.form');

const amount = form.elements.amount;
const firstDelay = form.elements.delay;
const stepDelay = form.elements.step;

let position = 0;

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
      return
    }
  });

  promise.then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ ПЕРЕМОГА promise ${position} in ${delay}ms`);
  });
  promise.catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ ЗРАДА promise ${position} in ${delay}ms`);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  setTimeout(() => {
    timerId = setInterval(() => {
      position = position + 1;
      createPromise(position, Number(stepDelay.value));

      if (position === Number(amount.value)) {
        clearInterval(timerId);
      }
      console.log(position);
    }, Number(stepDelay.value));
  }, Number(firstDelay.value));
});
