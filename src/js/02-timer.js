import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const body = document.querySelector('body');

const inputData = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const counterDays = document.querySelector('.value[data-days]');
const counterHours = document.querySelector('.value[data-hours]');
const counterMinutes = document.querySelector('.value[data-minutes]');
const counterSeconds = document.querySelector('.value[data-seconds]');

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
      return;
    }
    startButton.disabled = false;

    startButton.addEventListener('click', event => {
    startButton.disabled = true;
    inputData.disabled = true;
      let timerId = setInterval(() => {
        let remainingMs = selectedDates[0] - new Date();
        if (remainingMs <= 1000) {
          clearInterval(timerId);
          body.style.backgroundColor = 'red';
        }
        convertMs(remainingMs);
      }, 1000);
      function convertMs(remainingMs) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(remainingMs / day);
        // Remaining hours
        const hours = Math.floor((remainingMs % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((remainingMs % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((remainingMs % day) % hour) % minute) / second);

        counterDays.textContent = String(days).padStart(2, 0);
        counterHours.textContent = String(hours).padStart(2, 0);
        counterMinutes.textContent = String(minutes).padStart(2, 0);
        counterSeconds.textContent = String(seconds).padStart(2, 0);
      }
    });
  },
};
flatpickr(inputData, options);
