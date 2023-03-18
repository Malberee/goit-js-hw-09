import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dayRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

const currentDate = new Date();
let selectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  datePicker.disabled = true;

  const counter = setInterval(() => {
    let distance = selectedDate.getTime() - new Date().getTime();

    if (distance >= 0) {
      let time = convertMs(distance);

      dayRef.textContent = addLeadingZero(time.days);
      hoursRef.textContent = addLeadingZero(time.hours);
      minutesRef.textContent = addLeadingZero(time.minutes);
      secondsRef.textContent = addLeadingZero(time.seconds);
    } else {
      clearInterval(counter);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(datePicker, options);
