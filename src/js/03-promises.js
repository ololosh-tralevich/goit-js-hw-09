import Notiflix from 'notiflix';

const form = document.querySelector('form.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay);
    delay += step;
  }
});

// - - - - - - - - - - - - - - -

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        return resolve({ position, delay });
      } else {
        // Reject
        return reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ ПЕРЕМОГА promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ ЗРАДА promise ${position} in ${delay}ms`);
    });
}
