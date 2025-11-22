import flatpickr from "flatpickr";
import iziToast from "izitoast";
const refs = {
    inputElem: document.querySelector('#datetime-picker'),
    btnElem: document.querySelector('[data-start]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
document.addEventListener('DOMContentLoaded', () => {
    refs.btnElem.disabled = true;
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        console.log(userSelectedDate);
        
        if (userSelectedDate <= new Date()) {
            iziToast.show({
                color: 'red',
                backgroundColor: '#c40000',
                theme: 'dark',
                position: 'topRight',
                message: 'Please choose a date in the future',
                icon: '',
                timeout: 3000,
            });
            refs.btnElem.disabled = true;
        } else {
            refs.btnElem.disabled = false;
            refs.btnElem.classList.add("active");
        };
    }
};
let intervalId = null;
function startTimer() {
    if (refs.btnElem.disabled) return;

    if (intervalId) {
        clearInterval(intervalId);
    };
    refs.btnElem.disabled = true;
    refs.inputElem.disabled = true;
    refs.btnElem.classList.remove("active");
        intervalId = setInterval(() => {
            const currentTime = new Date();
            const diffsMS = userSelectedDate - currentTime;
            const result = convertMs(diffsMS);
            refs.daysValue.textContent = addLeadingZero(result.days);
            refs.hoursValue.textContent = addLeadingZero(result.hours);
            refs.minutesValue.textContent = addLeadingZero(result.minutes);
            refs.secondsValue.textContent = addLeadingZero(result.seconds);

            if (diffsMS <= 0) {
                 clearInterval(intervalId);
                 refs.daysValue.textContent = '00';
                 refs.hoursValue.textContent = '00';
                 refs.minutesValue.textContent = '00';
                 refs.secondsValue.textContent = '00';
                 return;
            };
        }, 1000);
   
}; 

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
        
refs.btnElem.addEventListener('click', () => {
    startTimer(); 
});

flatpickr(refs.inputElem, options);


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

