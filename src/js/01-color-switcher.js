const bodyDocument = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  bodyDocument.style.backgroundColor = randomColor;
}

buttonStart.addEventListener('click', event => {
  timerId = setInterval(() => {
    getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true; 
  buttonStop.disabled = false; 
});

if (!buttonStart.disabled) {
    buttonStop.disabled = true;
}

buttonStop.addEventListener('click', event => {
    clearInterval(timerId);
  buttonStart.disabled = false; 
  buttonStop.disabled = true; 
});
